import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import jwt from 'jsonwebtoken';
const { signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } = require('../controller/userController');

const router=Router();

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get("/", async (req, res) => {
    res.send("funciona")
})
router.get('/:id', TokenValidation, async(req,res) => {
    try{
        let { id } = req.params;
        let dataUser = await getUserById(id);
        res.json(dataUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*GET trae de un Boss por id los supervisores que tiene a su cargo
//* y si el id es de supervisor trae del mismo los watchers a su cargo
//http://localhost:3001/user/:id?name=name
router.get('/employees/:id', TokenValidation, async (req, res)=> {
    try{
        let { id } = req.params;
        let { name } = req.query;
        let userData = await getUserByHierarchy(id, name);
        res.json(userData);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//* POST crea un usuario segun el role: boss/supervisor/watcher
//http://localhost:3001/user  //*datos enviados por body
router.post('/:id', TokenValidation, async (req, res) => {
    let { id } = req.params;
    let { name, lastName, password, dni, email, telephone, environment, workingHours, profilePic } = req.body;
    try {
        let data = await signUp(id, name, lastName, password, dni, email, telephone, environment, workingHours, profilePic);
        const token = jwt.sign({_id:data.id}, process.env.TOKEN_SECRET||'tokenPass',{
            expiresIn:60*60*24
        })
        res.header('auth-token',token).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*PUT modifica los datos de un usuario segun su role: supervisor/watcher
//http://locahost:3001/user/:id   //*id por params, datos por body
router.put('/:id', TokenValidation, async (req, res)=>{
    let { id } = req.params;
    let { password, email, telephone, environment, workingHours, profilePic } = req.body;
    try{
        let data = await updateUser(id, password, email, telephone, environment, workingHours, profilePic);
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*DELETE elimina un usuario segun su rol: supervisor/watcher
//http://localhost:3001/user/:id  //*id por params
router.delete('/:id', TokenValidation, async (req, res) => {
    let { id } = req.params;
    let { role } = req.body;
    try{
        let message = await deleteUser(id, role);
        res.json(message);
    }catch(error){        
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;
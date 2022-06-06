import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import jwt from 'jsonwebtoken';
import { signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } from '../controller/userController';
import { bossModel } from '../models/user';

const router=Router();

router.post('/boss', async (req, res) => {
    async function bossCreator () {
        const boss = await bossModel.create({
              name: 'Emi',
              lastName: 'Conde',
              password: 'granjefe@biggestjefe.password',
              dni: 88888888,
              email: 'disizmuymale',
              telephone: 18181818,
              environment: 'Mi casa'
        })
        const saveUser = await boss.save();
        return saveUser;
     }
     
    let boss = bossCreator();
    res.json(boss);
})

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get("/", async (req, res) => {
    let all = await bossModel.findById('629d3056eff8fb00c2265ac2');
    res.send(all);
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
        if (typeof name === 'string') {
            let userData = await getUserByHierarchy(id, name);
            res.json(userData);
        }
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
    console.log(id);
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
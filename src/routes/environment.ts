import { Router } from 'express';
import { getAllEnvironments, getEnvironmentUsers, environmentDelete, environmentCreate } from '../controller/environmentController';
import { TokenValidation } from './../libs/verifyToken';

const router = Router();

router.get('/', TokenValidation, async (req, res) => {
    try {
        const environments = await getAllEnvironments();
        res.json(environments);
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error',error.message)
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.get('/:id/:name', TokenValidation, async (req, res) => {
    console.log('estoy dentroooo')
    let { id ,name} = req.params;
    
    try {
        let users = await getEnvironmentUsers(id, name);
        res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error',error.message)
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.post('/', TokenValidation, async(req,res)=>{
    let {name} = req.body;
    try{
        let create = await environmentCreate(name);
        res.json(create);
    }catch(error){
        if (error instanceof Error) {
            console.log('Error',error.message)
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})
router.delete('/',async(req,res)=>{
    let {name} = req.body;
    try{
        let deleteEnv = await environmentDelete(name);
        res.json(deleteEnv);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;
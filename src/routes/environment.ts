import { post } from '@typegoose/typegoose';
import { Router } from 'express';
import { environmentCreate } from '../controller/environmentController';
import { TokenValidation } from './../libs/verifyToken';

const router = Router();

router.post('/', TokenValidation, async(req,res)=>{
    let {name} = req.body
    console.log('nameRo',name)
    try{
        let create = await environmentCreate(name)
        res.json(create)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;
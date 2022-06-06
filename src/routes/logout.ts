import { Router } from 'express';

const router = Router();

router.get('/', async(req,res)=>{
    try{
        res.json('');
    }catch(err){
        console.log(err)
    }
})

export default router;
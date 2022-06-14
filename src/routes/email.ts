import { Router } from 'express';
import { getUserByDNI } from '../controller/emailController';
import { getUserById, updateUser } from '../controller/userController';
import { TokenValidation, TokenCreation, RefreshToken } from '../libs/verifyToken';

const router = Router();

router.put('/', async(req, res) => {
    try{
        let { email, dni } = req.body;
        let response = await getUserByDNI(dni, email);
            res.json("Email enviado");
    }catch(error:any){
        if (error instanceof Error) {
            res.status(404).json(error);
         } else {
            console.log('Unexpected Error', error);
         }
    }
})

router.put('/recover/:id', TokenValidation, async(req, res) => {
    let { password } = req.body;
    let { id } = req.params;
    try{
   
        await updateUser(id, password)
        let dataUser = await getUserById(id);

        const token = TokenCreation(id);
        const refresh = RefreshToken(dataUser[0].email);

        dataUser.push(token);
        dataUser.push(refresh);
        res.cookie('refresh-token', refresh);
        res.cookie('auth-token', token).json(dataUser);

    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error);
         } else {
            console.log('Unexpected Error', error);
         }
    }
})

export default router;
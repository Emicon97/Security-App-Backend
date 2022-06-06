import { Router } from 'express';
import { logIn } from '../controller/logInController';
import { getUserById } from '../controller/userController';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async(req, res, next)=>{
   try{
       let {dni, password}= req.body;
       let findUser = await logIn(dni, password);
      console.log(findUser)
       if(findUser){
            const token = jwt.sign({_id:findUser.id}, process.env.TOKEN_SECRET || 'tokenPass', {
               expiresIn:60*60*24
            })
            let dataUser = await getUserById(findUser.id);
            dataUser.push(token);
            res.cookie('auth-token', token).json(dataUser);
       } else {
         res.redirect('/');
       }
   } catch (error) {
      if (error instanceof Error) {
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

export default router;
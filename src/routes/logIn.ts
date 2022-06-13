import { Router } from 'express';
import { logIn } from '../controller/logInController';
import { getUserById } from '../controller/userController';
import { TokenCreation, RefreshToken } from '../libs/verifyToken';

const router = Router();

router.post('/', async(req, res, next)=>{
   try{
      let {dni, password}= req.body;
      let findUser = await logIn(dni, password);

       if(findUser){
            const token = TokenCreation(findUser.id);
            const refresh = RefreshToken(findUser.email);

            let dataUser = await getUserById(findUser.id);

            dataUser.push(token);
            dataUser.push(refresh);
            res.cookie('refresh-token', refresh);
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
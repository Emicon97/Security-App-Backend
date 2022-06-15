import { Router } from 'express';
import { verificationEmail, verificationDNI, verificationEmailAndDNI } from '../controller/verificationController';
const router = Router();

//!Verifica si el email ingresado por el usuario existe o no en la DB
//* necesita que se envie el email a comprobar por BODY
//http://localhost:3001/verification/email
router.get('/email', async(req,res) => {
    let {email} = req.body;
    try{
        let status = await verificationEmail(email);
        //return "email not available" si ya existe
        //       "email available" si esta disponible
        res.send(status)
    }catch(error:any){
        throw new Error(error.message)
    }
})

//!Verifica si el dni ingresado por el usuario existe o no en la DB
//* necesita que se envie el dni a comprobar por BODY
//http://localhost:3001/verification/dni
router.get('/dni', async(req, res) => {
    let {dni} = req.body;
    try{
        let status = await verificationDNI(dni);
        //return "ID not available" si el dni ya existe 
        //       "ID available" si esta disponible
        res.send(status);
    }catch(error:any){
        throw new Error(error.message);
    }
})


//!Verifica si el dni y email ingresados pertenecen al mismo usuario
//* necesita que se envie dni y email por body
//http://localhost:3001/verification/user
router.get('/user/:dni/:email', async(req, res) => {
    try{
        const { dni, email } = req.params;
        let user = await verificationEmailAndDNI(dni, email)
        if(user !== false){
            res.send('Correct compatibility')
        }else{
            res.send('Incompatible compatibility')
        }
    }catch(error:any){
        throw new Error(error.message);
    }
})

export default router;
import { Router } from 'express';
import { verificationEmail, verificationDNI } from '../controller/verificationController';
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

export default router;
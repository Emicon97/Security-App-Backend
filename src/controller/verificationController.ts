import {bossModel, watcherModel, supervisorModel} from '../models/user';

//*Function verifica si existe un email y retorna un string
async function verificationEmail(email:string){
    try{
        let bossEmail = await bossModel.findOne({email:email});
        let supervisorEmail = await supervisorModel.findOne({email:email});
        let watcherEmail = await watcherModel.findOne({email:email});

        //si el condicional es true significa que el email ya existe!
        if(bossEmail || supervisorEmail || watcherEmail){
            return "email not available";
        }else{
            return "email available";
        }
    }catch(error:any){
        throw new Error(error.message);
    }
} 

//*Function verifica si existe un dni y retorna un string
async function verificationDNI(dni:number){
    try{
        let bossDNI = await bossModel.findOne({dni:dni});
        let supervisorDNI = await supervisorModel.findOne({dni:dni});
        let watcherDNI = await watcherModel.findOne({dni:dni});
        
        //si el condicional es true significa que el DNI ya existe!
        if(bossDNI || supervisorDNI || watcherDNI){
            return "ID not available";
        }else{
            return "ID available";
        }
    }catch(error:any){
        throw new Error(error.message);
    }
}

export{
    verificationEmail,
    verificationDNI,
}
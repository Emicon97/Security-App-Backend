import environmentModel from "../models/environment";
import { bossModel } from "../models/user";
import { Environment } from './../models/environment';

async function environmentCreate(name:string){
    if(name){
        let findInDB = await environmentModel.find({name});
        console.log('find',findInDB)
        if(findInDB.length===0){
            let nameOfViro = await environmentModel.create({name});
            let saverViro = await nameOfViro.save();
            return saverViro
        } throw new Error('The environment already exists.')
    }else{
        throw new Error('Enter a name.')
    }
}

async function environmentDelete(name:string) {
        let findInDB = await environmentModel.find({name})
        if(findInDB){
            await environmentModel.deleteOne({name})
            return 'Enviroment delete successfully.'
        } throw new Error('The environment does not exist.')
}

async function environmentUser(id:string, environment:string, role:string) {
    console.log('props',id,environment,role)
    const enviro= await environmentModel.findOne({name:environment})
    console.log('enviro',enviro)
    if(enviro===null) throw new Error('The environment does not exist.')
    if(role==='supervisor') await environmentModel.findByIdAndUpdate(enviro._id, { $push: { 'supervisor':id } });
    if(role==='watcher') await environmentModel.findByIdAndUpdate(enviro._id, { $push: { 'watcher':id } });
    return; 
}
export{
    environmentCreate,
    environmentDelete,
    environmentUser
}
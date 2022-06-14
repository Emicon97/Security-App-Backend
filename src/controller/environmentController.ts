import environmentModel from "../models/environment";
import { roleIdentifier } from './userController';
import { Environment } from './../models/environment';

async function getEnvironmentUsers(id:string, name:string) {
    try {
        const role:string = await roleIdentifier(id);
        const users:Environment[] = [];

        if (role === 'boss') {
            environmentModel.find({ name })
                .populate({ path: 'supervisor' })
                .then((response:Environment[]) => {
                    if (response.length) {
                        response.map((supervisor) => {
                            users.push(supervisor);
                        })
                    }
            })
        }
        environmentModel.find({ name })
            .populate({ path: 'watcher' })
            .then((response:Environment[]) => {
                if (response.length) {
                    response.map((watcher) => {
                        users.push(watcher);
                    })
                }
            })
    } catch (error:any) {
        throw new Error (error.message);
    }
}

async function environmentCreate(name:string){
    if(name){
        let findInDB = await environmentModel.find({name});

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
    const enviro= await environmentModel.findOne({name:environment})
    if(enviro===null) throw new Error('The environment does not exist.')
    if(role==='supervisor') await environmentModel.findByIdAndUpdate(enviro._id, { $push: { 'supervisor':id } });
    if(role==='watcher') await environmentModel.findByIdAndUpdate(enviro._id, { $push: { 'watcher':id } });
    return; 
}
export{
    getEnvironmentUsers,
    environmentCreate,
    environmentDelete,
    environmentUser
}
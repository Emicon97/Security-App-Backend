import { bossModel, supervisorModel, watcherModel } from '../models/user';

async function logIn (dni:number, password:string) {
    if(dni && password){
        try{
            let findBoss = await bossModel.findOne({dni, password});
            let findSupervisor= await supervisorModel.findOne({dni, password});
            let findWatcher= await watcherModel.findOne({dni, password});
            if(findBoss!==null) return findBoss;
            if(findSupervisor!==null) return findSupervisor;
            if(findWatcher!==null) return findWatcher;
            return false;
        }catch(err){
            console.log(err);
        }
    } else {
        throw new Error('Complete the required fields.');
    }
}

export default {
    logIn
};
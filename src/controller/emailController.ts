import { bossModel, supervisorModel, watcherModel } from '../models/user';
import { recoverEmail } from '../config/email';
import { RefreshToken, TokenCreation } from '../libs/verifyToken'
  
export async function getUserByDNI(dni:number, email:string){
  
    let findBoss = await bossModel.findOneAndUpdate({dni, email}, {changingPassword: true});
    let findSupervisor= await supervisorModel.findOneAndUpdate({dni, email},{changingPassword: true});
    let findWatcher= await watcherModel.findOneAndUpdate({dni, email}, {changingPassword: true});
    if(!findBoss && !findSupervisor && !findWatcher ) throw new Error("That email does not match your ID.")
    var id:string = ""

    if(findBoss!==null)  id =  findBoss._id;
    if(findSupervisor!==null) id = findSupervisor._id;
    if(findWatcher!==null) id = findWatcher._id;
   
    const token = TokenCreation(id);
    const refresh = RefreshToken(email);

    if(findBoss!==null) return recoverEmail(findBoss,  token, refresh);
    if(findSupervisor!==null) return recoverEmail(findSupervisor, token, refresh);
    if(findWatcher!==null) return recoverEmail(findWatcher, token, refresh);

}


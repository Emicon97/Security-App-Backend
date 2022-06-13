import {bossModel, neighbourModel, supervisorModel, watcherModel} from '../models/user';
import { Boss, Supervisor, Watcher, Neighbour } from '../models/user';
const emailer = require('../config/email');
 
async function getUserById(id:string):Promise<[ Boss | Supervisor | Watcher | Neighbour, string ]> {
    var response:[ Boss | Supervisor | Watcher | Neighbour, string ];

    let findBoss = await bossModel.findById(id);
    let findSupervisor = await supervisorModel.findById(id);
    let findWatcher = await watcherModel.findById(id);
    let findNeighbour = await neighbourModel.findById(id);
    
    if (findBoss!==null) {
        return response = [findBoss, 'boss'];
    } else if (findSupervisor!==null) {
        return response = [findSupervisor, 'supervisor'];
    } else if (findWatcher!==null) {
        return response = [findWatcher, 'watcher'];
    } else if (findNeighbour!==null) {
        return response = [findNeighbour, 'neighbour'];
    }
    throw new Error ("This user does not exist.");
}

async function getUserByHierarchy(id:string, name?:string) {
    try{
        if (!name) {
            return await getEmployees(id);
        } else {
            return await getEmployeeByName(id, name);
        }
    }catch(error:any){
        throw new Error(error.message);
    }
}

async function getEmployees (id:string) {
    let boss = await bossModel.findById(id);
    if (boss) {
        return await bossModel.findById(id).populate({path:'supervisor'});
    }else{
        return await supervisorModel.findById(id).populate({path:'watcher'});
    }
}

function escapeStringRegexp(string:string) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
	}
	return string
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
}

async function getEmployeeByName (id:string, name:string) {
    let $regex = escapeStringRegexp(name)
    let boss = await bossModel.findById(id);
    if (boss) {
        return await bossModel.findById(id).populate({path:'supervisor', match:{name: {$regex}}});
    }else{
        return await supervisorModel.findById(id).populate({path:'watcher', match:{name:{$regex}}});
    }
}

async function signUp (
    id:string,
    name:string,
    lastName:string,
    password:string,
    dni:number,
    email:string,
    telephone:number,
    environment:string,
    workingHours?:string,
    profilePic?:string,
    address?:string
    ) {
        
    await dniCHecker(dni);
    
    let creator = await roleIdentifier(id);

    switch (creator) {
        case 'boss':
            const supervisor = await supervisorModel.create({
                name,
                lastName,
                password,
                dni,
                email,
                telephone,
                environment,
                workingHours: workingHours ? workingHours : undefined,
                profilePic: profilePic ? profilePic : undefined,
                address: address ? address : undefined
            });
            const saveSupervisor:any = await supervisor.save();
            emailer.sendMail(supervisor);
            await bossModel.findByIdAndUpdate(id, { $push: { supervisor } });
            return saveSupervisor;
        case 'supervisor':
            const watcher = await watcherModel.create({
                name,
                lastName,
                password,
                dni,
                email,
                telephone,
                environment,
                workingHours: workingHours ? workingHours : undefined,
                profilePic: profilePic ? profilePic : undefined,
                address: address ? address : undefined
            });
            const saveWatcher:any = await watcher.save();
            emailer.sendMail(watcher);
            await supervisorModel.findByIdAndUpdate(id, { $push: { watcher } });
            return saveWatcher;
    }
}

async function deleteUser (id:string, role:string):Promise<string> {
    if(role === 'supervisor') {
        await supervisorModel.findByIdAndDelete(id);
        return 'Supervisor deleted.';
    }
    if(role === 'watcher') {
        await watcherModel.findByIdAndDelete(id);
        return 'Security guard deleted.';
    };
    throw new Error ('The person that you are trying to delete from the database could not be found.');
}

async function updateUser (
    id:string,
    password?:string,
    email?:string,
    telephone?:number,
    environment?:string,
    workingHours?:string,
    profilePic?:string,
    address?:string
    ):Promise<[ Boss | Supervisor | Watcher, string ]> {
    const options = {new:true}
    const role = await roleIdentifier(id);

    if (role === 'boss') {
        let data:any = bossModel.findByIdAndUpdate(id,{
              password,
              email,
              telephone,
              profilePic,
              address
          },options)
          .then((response)=>{
              if(response !== null){
                  return [response, 'boss']
              }
          })
          if(data !== undefined) return data
      } 
        
    if (role === 'supervisor') {
      let data:any = supervisorModel.findByIdAndUpdate(id,{
            password,
            email,
            telephone,
            environment,
            workingHours,
            profilePic,
            address
        },options)
        .then((response)=>{
            if(response !== null){
                return [response, 'supervisor']
            }
        })
        if(data !== undefined) return data
    } 
    if (role === 'watcher') {
      let data:any = watcherModel.findByIdAndUpdate(id,{
            password,
            email,
            telephone,
            environment,
            workingHours,
            profilePic,
            address
        }, options)
            .then((response)=>{
                if(response !== null){
                    return [response, 'watcher']
                }
            }) 
    if(data !== undefined) return data    
    }
    
    throw new Error("Nothing could be updated.")
}

async function roleIdentifier (id:string):Promise<string> { 
    const isBoss = await bossModel.findById(id);
    if (isBoss !== null) return 'boss';
    const isSupervisor = await supervisorModel.findById(id);
    if (isSupervisor !== null) return 'supervisor';
    const isWatcher = await watcherModel.findById(id); 
    if (isWatcher !== null) return 'watcher';
    throw new Error ("No task has been found for this employee.");
}

async function dniCHecker (dni:number) {
    await watcherModel.findOne({dni})
    .then((watcher:any) => {
        if (watcher) {
            throw new Error ("That security guard is already registered in the company's database.");
        }
    })
    .then(async () => {
        return await supervisorModel.findOne({dni});
    })
    .then((supervisor:any) => {
        if (supervisor) {
            throw new Error ("That supervisor is already registered in the company's database.");
        }
    })
    .then(async () => {
        return await bossModel.findOne({dni});
    })
    .then((boss:any) => {
        if (boss) {
            throw new Error ('You are already registered in our database.');
        }
    })
    .catch((err:any) => {
        throw new Error (err.message);
    })
}

export {
    signUp,
    getUserById,
    getUserByHierarchy,
    deleteUser,
    updateUser
};
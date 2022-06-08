import { bossModel, supervisorModel } from '../models/user';
import toDosModel from '../models/toDos';

//* funcion que reemplaza el operador LIKE en las busquedas por nombre
function escapeStringRegexp(string:any) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
}

//*Controlador Paginado de Usuarios
//* query
//* id = identifica sobre que usuario hacer el paginado Boss/Supervisor
//* limit = cantidad de usuario para ver por pagina
//* skip = Desde que usuario empieza a contar ej: 0 igual al primer usuario
//* name = realiza el paginado segun el resultado de la busqueda de nombre
async function getEmployeesPaginatedManager (id:string, limit:number, skip:number, name?:string){
    try{
        if(id && limit && skip && !name){
            return await getPaginatedAll(id, limit, skip)
        }else if(id && limit && skip && name){
            return await getPaginatedEmployeesByName(id, limit, skip, name)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//* Realiza el paginado sobre todos los usuarios segun limit y skip
async function getPaginatedAll (id:string, limit:number, skip:number){
    try{
        let boss = await bossModel.findById(id);
        if(boss){
            let supervisors = await bossModel.findOne({ id }).populate({
                    path:'supervisor',
                    options:{ limit, skip }
                });
            if (supervisors) return supervisors.supervisor;
        }else{
            const watchers =  await supervisorModel.findOne({ id }).populate(
                {
                    path:'watcher',
                    options:{ limit, skip }
                });
            if (watchers) return watchers.watcher;
        }
    }catch(error:any){
        throw new Error('There are no employees.');
    }
}

//*Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip
async function getPaginatedEmployeesByName (id:string, limit:number, skip:number, name:string){
    let $regex = escapeStringRegexp(name)
    try{
        let boss = await bossModel.findById(id);
        if(boss){
            return await bossModel.findOne({id:id}).populate({
                path:'supervisor',
                match:{ name: {$regex} },
                options:{ limit, skip }
            })
        }else {
            return await supervisorModel.findOne({id:id}).populate({
                path:'watcher',
                match: { name: {$regex}},
                options:{ limit, skip }
            })
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//*Controlador de paginado para Tareas
//* query
//* id = identifica sobre que usuario hacer el paginado Supervisor/Watcher
//* limit = cantidad de tareas para ver por pagina
//* skip = Desde que tarea empieza a contar ej: 0 igual a la primer tarea del usuario
//* name = realiza el paginado segun el resultado de la busqueda de nombre
async function getTodosPaginatedManager(id:string, limit:number, skip:number, name:string){
    try{
        if(id && limit && skip && !name){
            return await getToDosPaginatedAll(id, limit, skip)
        }else if (id && limit && skip && name){
            return await getToDosPaginatedFilterName(id, limit, skip, name)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//* Realiza el paginado sobre todas las tareas segun limit y skip
async function getToDosPaginatedAll (id:string, limit:number, skip:number) {
    try{
        let response = await toDosModel.find({responsible: id}).skip(skip).limit(limit)
        return response
    }catch(error:any){
        throw new Error(error.message)
    }
}
//* Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip
async function getToDosPaginatedFilterName (id:string, limit:number, skip:number, name:string){
    let $regex = escapeStringRegexp(name)
    try{
        return await toDosModel.find({$and:[
            {responsible:id},
            {name:{$regex}}
        ]}).skip(skip).limit(limit)
    }catch(error:any){
        throw new Error(error.message)
    }
}

export {
    getEmployeesPaginatedManager,
    getTodosPaginatedManager,
};
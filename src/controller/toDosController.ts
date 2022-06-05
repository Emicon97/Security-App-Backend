import toDosModel from '../models/toDos';
import { bossModel, supervisorModel, watcherModel } from '../models/user';


async function getToDosManager (id?:string, priority?:string, status?:string) {
  try {
    if (!id) {
      return getAllToDos();
    } else if (id && !priority && !status) {
      return await getToDos(id);
    } else if (id && priority && !status) {
      return await getByIdAndPriority(id, priority);
    } else if (id && !priority && status) {      
      return await getByIdAndStatus(id, status);
    }  else if (id && priority && status) {
      return await getByIdPriorityAndStatus(id, priority, status);
    }
  } catch (err:any) {
    throw new Error (err.message);
  } 
}

async function getAllToDos () {
  const allTodos = await toDosModel.find();
  if (allTodos.length > 0 ) {
    return allTodos;
  }
}

async function getToDos (id:string) {
  // First check if the id belongs to a task.
  // Primero revisá si el id pertenece a una tarea.
  let toDos = await toDosModel.findById(id)
    .then(async (toDo:any) => {
      if (toDo !== null) {
        // If something was found, return it.
        // Si se encontró algo, devolvelo.
        return toDo;
      } else {
        // Else, check if it's a worker's id.
        // Si no, fijate si es la id de un trabajador.
        return await getToDosByRole(id);
      }
    })
    .catch((err:any) => {
      throw new Error (err.message);
    });
  return toDos;
}

async function getToDosByRole (responsible:string) {
  try {
    let toDos = await toDosModel.find({ responsible });
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function getByIdAndPriority (responsible:string, priority:string) {
  try {
    let toDos = await toDosModel.find({ responsible, priority })
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function getByIdAndStatus (responsible:string, status:string) {
  try {
    let toDos = await toDosModel.find({ responsible, status });
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
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


async function getByIdAndName (responsible:string, name:string) {
  const $regex = escapeStringRegexp(name)
  try{
    let toDos = await toDosModel.find({ responsible, name: {$regex}});
    if(toDos.length !== 0){
      return toDos;
    }else{
      return "There are no matching tasks.";
    }
  }catch(error: any){
    throw new Error (error.message);
  }
}



async function getByIdPriorityAndStatus (responsible:string, priority:string, status:string) {
  try {
    let toDos = await toDosModel.find({ responsible, priority, status });
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function assignTask (
  name:string,
  description:string | undefined,
  priority:string,
  responsible:string) {
  try {
    let createToDo = await toDosModel.create({
        name,
        description: description ? description : undefined,
        priority,
        responsible
    })
    await createToDo.save();

    return 'Task successfully assigned.';
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function updateToDo (id:string, name:string, description:string, status:string) {
  try {
    let data = await toDosModel.findByIdAndUpdate(id, {
      name,
      description,
      status
    });
    return data;
  } catch (err) {
    throw new Error ('Please complete all required fields.')
  }
}

async function deleteToDo (id:string) {
  try {
    await toDosModel.findByIdAndDelete(id);
    return 'Task has been successfully deleted.';
  } catch (err) {
    throw new Error ('The task does not exist.');
  }
}

export default  {
  getToDosManager,
  getToDos,
  getToDosByRole,
  getByIdAndStatus,
  getByIdAndName,
  assignTask,
  updateToDo,
  deleteToDo
};
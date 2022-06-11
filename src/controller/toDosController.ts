import toDosModel from '../models/toDos';
import { ToDos } from './../models/toDos';

async function getToDosManager (id?:string, priority?:string, status?:string):Promise<ToDos[]> {
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
    } else throw new Error ('Identification required.');
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function getAllToDos ():Promise<ToDos[]> {
  const allTodos = await toDosModel.find();
  if (allTodos.length > 0 ) {
    return allTodos;
  } else throw new Error ('No tasks found.');
}

async function getToDos (id:string):Promise<ToDos[]> {
  // First check if the id belongs to a task.
  let toDos = await toDosModel.findById(id)
    .then(async (toDo:any) => {
      if (toDo !== null) {
        // If something was found, return it.
        return toDo;
      } else {
        // Else, check if it's a worker's id.
        return await getToDosByRole(id);
      }
    })
    .catch((err:any) => {
      throw new Error (err.message);
    });
  return toDos;
}

async function getToDosByRole (responsible:string):Promise<ToDos[]> {
  let toDos = await toDosModel.find({ responsible });
  return toDos;
}

async function getByIdAndPriority (
  responsible:string,
  priority:string
  ): Promise<ToDos[]> {
  let toDos = await toDosModel.find({ responsible, priority })
  return toDos;
}

async function getByIdAndStatus (
  responsible:string,
  status:string
  ): Promise<ToDos[]> {
  try {
    let toDos = await toDosModel.find({ responsible, status });
    return toDos;
  } catch (err:any) {
    throw new Error (err.message);
  }
}

async function getByIdPriorityAndStatus (
  responsible:string,
  priority:string,
  status:string
  ): Promise<ToDos[]> {
  let toDos = await toDosModel.find({ responsible, priority, status });
  return toDos;
}

async function assignTask (
  name:string,
  description:string | undefined,
  priority:string,
  responsible:string
  ): Promise<string> {
  
    let createToDo = await toDosModel.create({
      name,
      description: description ? description : undefined,
      priority,
      responsible
  })
  await createToDo.save();

  return 'Task successfully assigned.';
}

async function updateToDo (
  id:string,
  name:string,
  description:string,
  status:string
  ): Promise<ToDos> {
  let data = await toDosModel.findByIdAndUpdate(id, {
    name,
    description,
    status
  });
  if (data) return data;

  throw new Error ('The task could not be updated.');
}

async function deleteToDo (id:string) {
  await toDosModel.findByIdAndDelete(id);
  return 'Task has been successfully deleted.';
}

async function getReportsFromTask (id:string):Promise<ToDos> {
  const reports = await toDosModel.findById(id).populate({path:'report'});
  if (reports) return reports;

  throw new Error ('There are reports for this task yet.');
}

export {
  getToDosManager,
  getToDos,
  getToDosByRole,
  getByIdAndStatus,
  assignTask,
  updateToDo,
  deleteToDo,
  getReportsFromTask
};
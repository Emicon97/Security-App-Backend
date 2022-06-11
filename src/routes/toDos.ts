import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import {
    getToDosManager,
    assignTask,
    updateToDo,
    deleteToDo,
    getReportsFromTask
} from '../controller/toDosController';

const router = Router();


//*GET trae todas las tareas en la Base de Datos
//http://localhost:3001/todos 
router.get('/', TokenValidation, async (req, res) => {
    try{
        let list = await getToDosManager();
        res.status(200).json(list);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.get('/reports/:id', TokenValidation,async (req, res) => {
    try {
        let { id } = req.params;
        let reports = await getReportsFromTask(id);
        res.status(200).json(reports);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*GET trae todas las tareas de un usuario por role: supervisor/watcher
//http://localhost:3001/todos/:id  //*id por params del "usuario"
router.get('/:id', TokenValidation, async (req, res) => { 
    let { id } = req.params;
    let { priority } = req.query;
    try{
        if (typeof priority === 'string') {
            let list = await getToDosManager(id, priority);
            res.status(200).json(list);
        } else {
            let list = await getToDosManager(id);
            res.status(200).json(list);
        }
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*GET trae las tareas de un usuario con un status especifico 
//http://localhost:3001/todos/:id/:status //*id y status por params
router.get('/:id/:status', TokenValidation, async (req, res) => { 
    let { id, status } = req.params;
    let { priority } = req.query;
    try{
        let toDos = await getToDosManager(id, priority as string, status);
        res.status(200).json(toDos);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})



//*POST crea una tarea nueva y es asignada al mismo tiempo a un usuario
//* por role: supervisor/watcher y por id del usuario
//http://localhost:3001/todos //*datos por body
router.post('/', TokenValidation, async (req, res) => {
    let{ name, description, priority, id } = req.body;
    try{
        let task = await assignTask(name, description, priority, id);
        res.json(task);
    }catch(error){
        if (error instanceof Error) {
            res.status(409).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*PUT modifica los datos de una tarea
//http://locahost:3001/todos/:id  //*id por params, datos a cambiar por body
router.put('/:id', TokenValidation, async (req, res)=>{
    let { id } = req.params;
    let { name, description, status } = req.body
    try{
        let data = await updateToDo(id, name, description, status);
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*DELETE elimina una tarea por id
//http://localhost:3001/todos/:id //*id por params
router.delete('/:id', TokenValidation, async (req, res)=>{
    let { id } = req.params;
    try{
        const successMessage = await deleteToDo(id);
        res.json(successMessage);
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;
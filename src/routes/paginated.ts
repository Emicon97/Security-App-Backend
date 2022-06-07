import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import { getEmployeesPaginatedManager, getTodosPaginatedManager } from '../controller/paginatedController';
const router = Router();

//*Paginado :id User Boss/Supervisor
//http://localhost:3001/paginated/:id?limit=limit&skip=skip&name=name
router.get('/:id', TokenValidation, async (req, res) => {
    let { id }:any = req.params;
    let { limit, skip }: any = req.query;
    let { name }:any = req.query;
    try{
        let response = await getEmployeesPaginatedManager(id, limit, skip, name);
        res.json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*Paginado de :tareas User Supervisor/watcher
//http://localhost:3001/paginated/:id?limit=limit&skip=skip&name=name
router.get('/todos/:id', TokenValidation, async(req, res) => {
    let { id }: any = req.params;
    let { limit, skip }:any = req.query;
    let { name }:any = req.query;
    try{
        let response = await getTodosPaginatedManager(id, limit, skip, name);
        res.json(response)
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;
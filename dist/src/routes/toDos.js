"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const toDosController_1 = require("../controller/toDosController");
const router = (0, express_1.Router)();
//*GET trae todas las tareas en la Base de Datos
//http://localhost:3001/todos 
router.get('/', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let list = yield (0, toDosController_1.getToDosManager)();
        res.status(200).json(list);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
router.get('/reports/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let reports = yield (0, toDosController_1.getReportsFromTask)(id);
        res.status(200).json(reports);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
//*GET trae todas las tareas de un usuario por role: supervisor/watcher
//http://localhost:3001/todos/:id  //*id por params del "usuario"
router.get('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { priority } = req.query;
    try {
        if (typeof priority === 'string') {
            let list = yield (0, toDosController_1.getToDosManager)(id, priority);
            res.status(200).json(list);
        }
        else {
            let list = yield (0, toDosController_1.getToDosManager)(id);
            res.status(200).json(list);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
//*GET trae las tareas de un usuario con un status especifico 
//http://localhost:3001/todos/:id/:status //*id y status por params
router.get('/:id/:status', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, status } = req.params;
    let { priority } = req.query;
    try {
        let toDos = yield (0, toDosController_1.getToDosManager)(id, priority, status);
        res.status(200).json(toDos);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
//*POST crea una tarea nueva y es asignada al mismo tiempo a un usuario
//* por role: supervisor/watcher y por id del usuario
//http://localhost:3001/todos //*datos por body
router.post('/', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, priority, id } = req.body;
    try {
        let task = yield (0, toDosController_1.assignTask)(name, description, priority, id);
        res.json(task);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
//*PUT modifica los datos de una tarea
//http://locahost:3001/todos/:id  //*id por params, datos a cambiar por body
router.put('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { name, description, status } = req.body;
    try {
        let data = yield (0, toDosController_1.updateToDo)(id, name, description, status);
        res.json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
//*DELETE elimina una tarea por id
//http://localhost:3001/todos/:id //*id por params
router.delete('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const successMessage = yield (0, toDosController_1.deleteToDo)(id);
        res.json(successMessage);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
exports.default = router;

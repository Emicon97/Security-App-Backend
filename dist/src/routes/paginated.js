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
const { getEmployeesPaginatedManager, getTodosPaginatedManager } = require('../controller/paginatedController');
const router = (0, express_1.Router)();
//*Paginado :id User Boss/Supervisor
//http://localhost:3001/paginated/:id?limit=limit&skip=skip&name=name
router.get('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { limit, skip } = req.query;
    let { name } = req.query;
    try {
        let response = yield getEmployeesPaginatedManager(id, limit, skip, name);
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
}));
//*Paginado de :tareas User Supervisor/watcher
//http://localhost:3001/paginated/:id?limit=limit&skip=skip&name=name
router.get('/todos/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { limit, skip } = req.query;
    let { name } = req.query;
    try {
        let response = yield getTodosPaginatedManager(id, limit, skip, name);
        res.json(response);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;

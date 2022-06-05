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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } = require('../controller/userController');
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("funciona");
}));
router.get('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let dataUser = yield getUserById(id);
        res.json(dataUser);
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
//*GET trae de un Boss por id los supervisores que tiene a su cargo
//* y si el id es de supervisor trae del mismo los watchers a su cargo
//http://localhost:3001/user/:id?name=name
router.get('/employees/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { name } = req.query;
        let userData = yield getUserByHierarchy(id, name);
        res.json(userData);
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
//* POST crea un usuario segun el role: boss/supervisor/watcher
//http://localhost:3001/user  //*datos enviados por body
router.post('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { name, lastName, password, dni, email, telephone, environment, workingHours, profilePic } = req.body;
    try {
        let data = yield signUp(id, name, lastName, password, dni, email, telephone, environment, workingHours, profilePic);
        const token = jsonwebtoken_1.default.sign({ _id: data.id }, process.env.TOKEN_SECRET || 'tokenPass', {
            expiresIn: 60 * 60 * 24
        });
        res.header('auth-token', token).json(data);
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
//*PUT modifica los datos de un usuario segun su role: supervisor/watcher
//http://locahost:3001/user/:id   //*id por params, datos por body
router.put('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { password, email, telephone, environment, workingHours, profilePic } = req.body;
    try {
        let data = yield updateUser(id, password, email, telephone, environment, workingHours, profilePic);
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
//*DELETE elimina un usuario segun su rol: supervisor/watcher
//http://localhost:3001/user/:id  //*id por params
router.delete('/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { role } = req.body;
    try {
        let message = yield deleteUser(id, role);
        res.json(message);
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
router.post('/boss', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function bossCreator() {
        return __awaiter(this, void 0, void 0, function* () {
            const boss = yield user_1.bossModel.create({
                name: 'Emi',
                lastName: 'Conde',
                password: 'granjefe@biggestjefe.password',
                dni: 88888888,
                email: 'disizmuymale',
                telephone: 18181818,
                environment: 'Mi casa'
            });
            const saveUser = yield boss.save();
            return saveUser;
        });
    }
    let boss = bossCreator();
    res.json(boss);
}));
exports.default = router;

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
const user_1 = require("../models/user");
const toDos_1 = __importDefault(require("../models/toDos"));
//* funcion que reemplaza el operador LIKE en las busquedas por nombre
function escapeStringRegexp(string) {
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
function getEmployeesPaginatedManager(id, limit, skip, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (id && limit && skip && !name) {
                return yield getPaginatedAll(id, limit, skip);
            }
            else if (id && limit && skip && name) {
                return yield getPaginatedEmployeesByName(id, limit, skip, name);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//* Realiza el paginado sobre todos los usuarios segun limit y skip
function getPaginatedAll(id, limit, skip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let boss = yield user_1.bossModel.findById(id);
            if (boss) {
                return yield user_1.bossModel.findOne({ id: id }).populate({
                    path: 'supervisor',
                    options: { limit, skip }
                });
            }
            else {
                return yield user_1.supervisorModel.findOne({ id: id }).populate({
                    path: 'watcher',
                    options: { limit, skip }
                });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//*Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip
function getPaginatedEmployeesByName(id, limit, skip, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let $regex = escapeStringRegexp(name);
        try {
            let boss = yield user_1.bossModel.findById(id);
            if (boss) {
                return yield user_1.bossModel.findOne({ id: id }).populate({
                    path: 'supervisor',
                    match: { name: { $regex } },
                    options: { limit, skip }
                });
            }
            else {
                return yield user_1.supervisorModel.findOne({ id: id }).populate({
                    path: 'watcher',
                    match: { name: { $regex } },
                    options: { limit, skip }
                });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//*Controlador de paginado para Tareas
//* query
//* id = identifica sobre que usuario hacer el paginado Supervisor/Watcher
//* limit = cantidad de tareas para ver por pagina
//* skip = Desde que tarea empieza a contar ej: 0 igual a la primer tarea del usuario
//* name = realiza el paginado segun el resultado de la busqueda de nombre
function getTodosPaginatedManager(id, limit, skip, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (id && limit && skip && !name) {
                return yield getToDosPaginatedAll(id, limit, skip);
            }
            else if (id && limit && skip && name) {
                return yield getToDosPaginatedFilterName(id, limit, skip, name);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//* Realiza el paginado sobre todas las tareas segun limit y skip
function getToDosPaginatedAll(id, limit, skip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield toDos_1.default.find({ responsible: id }).skip(skip).limit(limit);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//* Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip
function getToDosPaginatedFilterName(id, limit, skip, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let $regex = escapeStringRegexp(name);
        try {
            return yield toDos_1.default.find({ $and: [
                    { responsible: id },
                    { name: { $regex } }
                ] }).skip(skip).limit(limit);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.default = {
    getEmployeesPaginatedManager,
    getTodosPaginatedManager,
};

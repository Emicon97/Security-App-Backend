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
exports.verificationEmailAndDNI = exports.verificationDNI = exports.verificationEmail = void 0;
const user_1 = require("../models/user");
//*Function verifica si existe un email y retorna un string
function verificationEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bossEmail = yield user_1.bossModel.findOne({ email: email });
            let supervisorEmail = yield user_1.supervisorModel.findOne({ email: email });
            let watcherEmail = yield user_1.watcherModel.findOne({ email: email });
            //si el condicional es true significa que el email ya existe!
            if (bossEmail || supervisorEmail || watcherEmail) {
                return "email not available";
            }
            else {
                return "email available";
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.verificationEmail = verificationEmail;
//*Function verifica si existe un dni y retorna un string
function verificationDNI(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bossDNI = yield user_1.bossModel.findOne({ dni: dni });
            let supervisorDNI = yield user_1.supervisorModel.findOne({ dni: dni });
            let watcherDNI = yield user_1.watcherModel.findOne({ dni: dni });
            //si el condicional es true significa que el DNI ya existe!
            if (bossDNI || supervisorDNI || watcherDNI) {
                return "ID not available";
            }
            else {
                return "ID available";
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.verificationDNI = verificationDNI;
//*Function verifica si pertenece dni y email
function verificationEmailAndDNI(dni, email) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(dni, email);
        try {
            let boss = yield user_1.bossModel.findOne({ dni, email });
            let supervisor = yield user_1.supervisorModel.findOne({ dni, email });
            let watcher = yield user_1.watcherModel.findOne({ dni, email });
            if (boss !== null || supervisor !== null || watcher !== null) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.verificationEmailAndDNI = verificationEmailAndDNI;

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
exports.environmentUser = exports.environmentDelete = exports.environmentCreate = void 0;
const environment_1 = __importDefault(require("../models/environment"));
function environmentCreate(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (name) {
            let findInDB = yield environment_1.default.find({ name });
            console.log('find', findInDB);
            if (findInDB.length === 0) {
                let nameOfViro = yield environment_1.default.create({ name });
                let saverViro = yield nameOfViro.save();
                return saverViro;
            }
            throw new Error('The environment already exists.');
        }
        else {
            throw new Error('Enter a name.');
        }
    });
}
exports.environmentCreate = environmentCreate;
function environmentDelete(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let findInDB = yield environment_1.default.find({ name });
        if (findInDB) {
            yield environment_1.default.deleteOne({ name });
            return 'Enviroment delete successfully.';
        }
        throw new Error('The environment does not exist.');
    });
}
exports.environmentDelete = environmentDelete;
function environmentUser(id, name, role) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('props', id, name, role);
        const enviro = yield environment_1.default.findOne({ name });
        if (enviro === null)
            throw new Error('The environment does not exist.');
        yield environment_1.default.findByIdAndUpdate(enviro, { $push: { role: id } });
        return;
    });
}
exports.environmentUser = environmentUser;

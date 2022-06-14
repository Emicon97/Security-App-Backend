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
exports.environmentUser = exports.environmentDelete = exports.environmentCreate = exports.getEnvironmentUsers = exports.getAllEnvironments = void 0;
const environment_1 = __importDefault(require("../models/environment"));
const userController_1 = require("./userController");
function getAllEnvironments() {
    return __awaiter(this, void 0, void 0, function* () {
        const environments = yield environment_1.default.find();
        if (environments.length)
            return environments;
        throw new Error('There are no environments yet.');
    });
}
exports.getAllEnvironments = getAllEnvironments;
function getEnvironmentUsers(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const role = yield (0, userController_1.roleIdentifier)(id);
            const users = [];
            if (role === 'boss') {
                yield environment_1.default.find({ name })
                    .populate({ path: 'watcher supervisor' })
                    .then((response) => {
                    if (response.length) {
                        response.map((supervisor) => {
                            users.push(supervisor);
                        });
                    }
                });
            }
            else {
                yield environment_1.default.find({ name })
                    .populate({ path: 'watcher' })
                    .then((response) => {
                    if (response.length) {
                        response.map((watcher) => {
                            users.push(watcher);
                        });
                    }
                });
            }
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getEnvironmentUsers = getEnvironmentUsers;
function environmentCreate(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (name) {
            let findInDB = yield environment_1.default.find({ name });
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
function environmentUser(id, environment, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const enviro = yield environment_1.default.findOne({ name: environment });
        if (enviro === null)
            throw new Error('The environment does not exist.');
        if (role === 'supervisor')
            yield environment_1.default.findByIdAndUpdate(enviro._id, { $push: { 'supervisor': id } });
        if (role === 'watcher')
            yield environment_1.default.findByIdAndUpdate(enviro._id, { $push: { 'watcher': id } });
        return;
    });
}
exports.environmentUser = environmentUser;

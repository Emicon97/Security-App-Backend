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
exports.updateUser = exports.deleteUser = exports.getUserByHierarchy = exports.getUserById = exports.signUp = void 0;
const user_1 = require("../models/user");
const emailer = require('../config/email');
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var response;
        let findBoss = yield user_1.bossModel.findById(id);
        let findSupervisor = yield user_1.supervisorModel.findById(id);
        let findWatcher = yield user_1.watcherModel.findById(id);
        let findNeighbour = yield user_1.neighbourModel.findById(id);
        if (findBoss !== null) {
            return response = [findBoss, 'boss'];
        }
        else if (findSupervisor !== null) {
            return response = [findSupervisor, 'supervisor'];
        }
        else if (findWatcher !== null) {
            return response = [findWatcher, 'watcher'];
        }
        else if (findNeighbour !== null) {
            return response = [findNeighbour, 'neighbour'];
        }
        throw new Error("This user does not exist.");
    });
}
exports.getUserById = getUserById;
function getUserByHierarchy(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!name) {
                return yield getEmployees(id);
            }
            else {
                return yield getEmployeeByName(id, name);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getUserByHierarchy = getUserByHierarchy;
function getEmployees(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let boss = yield user_1.bossModel.findById(id);
        if (boss) {
            return yield user_1.bossModel.findById(id).populate({ path: 'supervisor' });
        }
        else {
            return yield user_1.supervisorModel.findById(id).populate({ path: 'watcher' });
        }
    });
}
function escapeStringRegexp(string) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
}
function getEmployeeByName(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let $regex = escapeStringRegexp(name);
        let boss = yield user_1.bossModel.findById(id);
        if (boss) {
            return yield user_1.bossModel.findById(id).populate({ path: 'supervisor', match: { name: { $regex } } });
        }
        else {
            return yield user_1.supervisorModel.findById(id).populate({ path: 'watcher', match: { name: { $regex } } });
        }
    });
}
function signUp(id, name, lastName, password, dni, email, telephone, environment, workingHours, profilePic, address) {
    return __awaiter(this, void 0, void 0, function* () {
        yield dniCHecker(dni);
        let creator = yield roleIdentifier(id);
        switch (creator) {
            case 'boss':
                const supervisor = yield user_1.supervisorModel.create({
                    name,
                    lastName,
                    password,
                    dni,
                    email,
                    telephone,
                    environment,
                    workingHours: workingHours ? workingHours : undefined,
                    profilePic: profilePic ? profilePic : undefined,
                    address: address ? address : undefined
                });
                const saveSupervisor = yield supervisor.save();
                emailer.sendMail(supervisor);
                yield user_1.bossModel.findByIdAndUpdate(id, { $push: { supervisor } });
                return saveSupervisor;
            case 'supervisor':
                const watcher = yield user_1.watcherModel.create({
                    name,
                    lastName,
                    password,
                    dni,
                    email,
                    telephone,
                    environment,
                    workingHours: workingHours ? workingHours : undefined,
                    profilePic: profilePic ? profilePic : undefined,
                    address: address ? address : undefined
                });
                const saveWatcher = yield watcher.save();
                emailer.sendMail(watcher);
                yield user_1.supervisorModel.findByIdAndUpdate(id, { $push: { watcher } });
                return saveWatcher;
        }
    });
}
exports.signUp = signUp;
function deleteUser(id, role) {
    return __awaiter(this, void 0, void 0, function* () {
        if (role === 'supervisor') {
            yield user_1.supervisorModel.findByIdAndDelete(id);
            return 'Supervisor deleted.';
        }
        if (role === 'watcher') {
            yield user_1.watcherModel.findByIdAndDelete(id);
            return 'Security guard deleted.';
        }
        ;
        throw new Error('The person that you are trying to delete from the database could not be found.');
    });
}
exports.deleteUser = deleteUser;
function updateUser(id, password, email, telephone, environment, workingHours, profilePic, address) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = { new: true };
        const role = yield roleIdentifier(id);
        if (role === 'boss') {
            let data = user_1.bossModel.findByIdAndUpdate(id, {
                password,
                email,
                telephone,
                profilePic,
                address
            }, options)
                .then((response) => {
                if (response !== null) {
                    return [response, 'boss'];
                }
            });
            if (data !== undefined)
                return data;
        }
        if (role === 'supervisor') {
            let data = user_1.supervisorModel.findByIdAndUpdate(id, {
                password,
                email,
                telephone,
                environment,
                workingHours,
                profilePic,
                address
            }, options)
                .then((response) => {
                if (response !== null) {
                    return [response, 'supervisor'];
                }
            });
            if (data !== undefined)
                return data;
        }
        if (role === 'watcher') {
            let data = user_1.watcherModel.findByIdAndUpdate(id, {
                password,
                email,
                telephone,
                environment,
                workingHours,
                profilePic,
                address
            }, options)
                .then((response) => {
                if (response !== null) {
                    return [response, 'watcher'];
                }
            });
            if (data !== undefined)
                return data;
        }
        throw new Error("Nothing could be updated.");
    });
}
exports.updateUser = updateUser;
function roleIdentifier(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isBoss = yield user_1.bossModel.findById(id);
        if (isBoss !== null)
            return 'boss';
        const isSupervisor = yield user_1.supervisorModel.findById(id);
        if (isSupervisor !== null)
            return 'supervisor';
        const isWatcher = yield user_1.watcherModel.findById(id);
        if (isWatcher !== null)
            return 'watcher';
        throw new Error("No task has been found for this employee.");
    });
}
function dniCHecker(dni) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user_1.watcherModel.findOne({ dni })
            .then((watcher) => {
            if (watcher) {
                throw new Error("That security guard is already registered in the company's database.");
            }
        })
            .then(() => __awaiter(this, void 0, void 0, function* () {
            return yield user_1.supervisorModel.findOne({ dni });
        }))
            .then((supervisor) => {
            if (supervisor) {
                throw new Error("That supervisor is already registered in the company's database.");
            }
        })
            .then(() => __awaiter(this, void 0, void 0, function* () {
            return yield user_1.bossModel.findOne({ dni });
        }))
            .then((boss) => {
            if (boss) {
                throw new Error('You are already registered in our database.');
            }
        })
            .catch((err) => {
            throw new Error(err.message);
        });
    });
}

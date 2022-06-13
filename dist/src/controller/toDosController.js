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
exports.getReportsFromTask = exports.deleteToDo = exports.updateToDo = exports.assignTask = exports.getByIdAndStatus = exports.getToDosByRole = exports.getToDos = exports.getToDosManager = void 0;
const toDos_1 = __importDefault(require("../models/toDos"));
function getToDosManager(id, priority, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!id) {
                return getAllToDos();
            }
            else if (id && !priority && !status) {
                return yield getToDos(id);
            }
            else if (id && priority && !status) {
                return yield getByIdAndPriority(id, priority);
            }
            else if (id && !priority && status) {
                return yield getByIdAndStatus(id, status);
            }
            else if (id && priority && status) {
                return yield getByIdPriorityAndStatus(id, priority, status);
            }
            else
                throw new Error('Identification required.');
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.getToDosManager = getToDosManager;
function getAllToDos() {
    return __awaiter(this, void 0, void 0, function* () {
        const allTodos = yield toDos_1.default.find();
        if (allTodos.length > 0) {
            return allTodos;
        }
        else
            throw new Error('No tasks found.');
    });
}
function getToDos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // First check if the id belongs to a task.
        let toDos = yield toDos_1.default.findById(id)
            .then((toDo) => __awaiter(this, void 0, void 0, function* () {
            if (toDo !== null) {
                // If something was found, return it.
                return toDo;
            }
            else {
                // Else, check if it's a worker's id.
                return yield getToDosByRole(id);
            }
        }))
            .catch((err) => {
            throw new Error(err.message);
        });
        return toDos;
    });
}
exports.getToDos = getToDos;
function getToDosByRole(responsible) {
    return __awaiter(this, void 0, void 0, function* () {
        let toDos = yield toDos_1.default.find({ responsible });
        return toDos;
    });
}
exports.getToDosByRole = getToDosByRole;
function getByIdAndPriority(responsible, priority) {
    return __awaiter(this, void 0, void 0, function* () {
        let toDos = yield toDos_1.default.find({ responsible, priority });
        return toDos;
    });
}
function getByIdAndStatus(responsible, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let toDos = yield toDos_1.default.find({ responsible, status });
            return toDos;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.getByIdAndStatus = getByIdAndStatus;
function getByIdPriorityAndStatus(responsible, priority, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let toDos = yield toDos_1.default.find({ responsible, priority, status });
        return toDos;
    });
}
function assignTask(name, description, priority, responsible) {
    return __awaiter(this, void 0, void 0, function* () {
        let createToDo = yield toDos_1.default.create({
            name,
            description: description ? description : undefined,
            priority,
            responsible
        });
        yield createToDo.save();
        return 'Task successfully assigned.';
    });
}
exports.assignTask = assignTask;
function updateToDo(id, name, description, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield toDos_1.default.findByIdAndUpdate(id, {
            name,
            description,
            status
        });
        if (data)
            return data;
        throw new Error('The task could not be updated.');
    });
}
exports.updateToDo = updateToDo;
function deleteToDo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield toDos_1.default.findByIdAndDelete(id);
        return 'Task has been successfully deleted.';
    });
}
exports.deleteToDo = deleteToDo;
function getReportsFromTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const reports = yield toDos_1.default.findById(id).populate({ path: 'report' });
        if (reports)
            return reports;
        throw new Error('There are reports for this task yet.');
    });
}
exports.getReportsFromTask = getReportsFromTask;

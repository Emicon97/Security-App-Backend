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
const user_1 = require("../models/user");
function logIn(dni, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (dni && password) {
            try {
                let findBoss = yield user_1.bossModel.findOne({ dni, password });
                let findSupervisor = yield user_1.supervisorModel.findOne({ dni, password });
                let findWatcher = yield user_1.watcherModel.findOne({ dni, password });
                if (findBoss !== null)
                    return findBoss;
                if (findSupervisor !== null)
                    return findSupervisor;
                if (findWatcher !== null)
                    return findWatcher;
                return false;
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            throw new Error('Complete the required fields.');
        }
    });
}
module.exports = {
    logIn
};

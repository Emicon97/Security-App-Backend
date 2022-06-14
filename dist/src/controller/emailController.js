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
exports.getUserByDNI = void 0;
const user_1 = require("../models/user");
const email_1 = require("../config/email");
const verifyToken_1 = require("../libs/verifyToken");
function getUserByDNI(dni, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let findBoss = yield user_1.bossModel.findOneAndUpdate({ dni, email }, { changingPassword: true });
        let findSupervisor = yield user_1.supervisorModel.findOneAndUpdate({ dni, email }, { changingPassword: true });
        let findWatcher = yield user_1.watcherModel.findOneAndUpdate({ dni, email }, { changingPassword: true });
        if (!findBoss && !findSupervisor && !findWatcher)
            throw new Error("That email does not match your ID.");
        var id = "";
        if (findBoss !== null)
            id = findBoss._id;
        if (findSupervisor !== null)
            id = findSupervisor._id;
        if (findWatcher !== null)
            id = findWatcher._id;
        const token = (0, verifyToken_1.TokenCreation)(id);
        const refresh = (0, verifyToken_1.RefreshToken)(email);
        if (findBoss !== null)
            return (0, email_1.recoverEmail)(findBoss, token, refresh);
        if (findSupervisor !== null)
            return (0, email_1.recoverEmail)(findSupervisor, token, refresh);
        if (findWatcher !== null)
            return (0, email_1.recoverEmail)(findWatcher, token, refresh);
    });
}
exports.getUserByDNI = getUserByDNI;

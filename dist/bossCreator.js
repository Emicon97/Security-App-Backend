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
console.log('entré');
require('dotenv').config();
const user_1 = require("./src/models/user");
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
bossCreator();

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
const logInController_1 = require("../controller/logInController");
const userController_1 = require("../controller/userController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { dni, password } = req.body;
        let findUser = yield (0, logInController_1.logIn)(dni, password);
        if (findUser) {
            const token = jsonwebtoken_1.default.sign({ _id: findUser.id }, process.env.TOKEN_SECRET || 'tokenPass', {
                expiresIn: 10
            });
            let dataUser = yield (0, userController_1.getUserById)(findUser.id);
            dataUser.push(token);
            res.cookie('auth-token', token).json(dataUser);
        }
        else {
            res.redirect('/');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
exports.default = router;

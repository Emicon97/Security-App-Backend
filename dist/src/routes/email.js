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
const express_1 = require("express");
const emailController_1 = require("../controller/emailController");
const userController_1 = require("../controller/userController");
const verifyToken_1 = require("../libs/verifyToken");
const router = (0, express_1.Router)();
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, dni } = req.body;
        let response = yield (0, emailController_1.getUserByDNI)(dni, email);
        res.json("Email enviado");
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
router.put('/recover/:id', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { password } = req.body;
    let { id } = req.params;
    try {
        yield (0, userController_1.updateUser)(id, password);
        let dataUser = yield (0, userController_1.getUserById)(id);
        const token = (0, verifyToken_1.TokenCreation)(id);
        const refresh = (0, verifyToken_1.RefreshToken)(dataUser[0].email);
        dataUser.push(token);
        dataUser.push(refresh);
        res.cookie('refresh-token', refresh);
        res.cookie('auth-token', token).json(dataUser);
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

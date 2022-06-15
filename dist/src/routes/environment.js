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
const environmentController_1 = require("../controller/environmentController");
const verifyToken_1 = require("./../libs/verifyToken");
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const environments = yield (0, environmentController_1.getAllEnvironments)();
        res.json(environments);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
router.get('/:id/:name', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('estoy dentroooo');
    let { id, name } = req.params;
    try {
        let users = yield (0, environmentController_1.getEnvironmentUsers)(id, name);
        res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
router.post('/', verifyToken_1.TokenValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.body;
    try {
        let create = yield (0, environmentController_1.environmentCreate)(name);
        res.json(create);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('Error', error.message);
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.body;
    try {
        let deleteEnv = yield (0, environmentController_1.environmentDelete)(name);
        res.json(deleteEnv);
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

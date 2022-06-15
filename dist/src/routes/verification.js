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
const verificationController_1 = require("../controller/verificationController");
const router = (0, express_1.Router)();
//!Verifica si el email ingresado por el usuario existe o no en la DB
//* necesita que se envie el email a comprobar por BODY
//http://localhost:3001/verification/email
router.get('/email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.body;
    try {
        let status = yield (0, verificationController_1.verificationEmail)(email);
        //return "email not available" si ya existe
        //       "email available" si esta disponible
        res.send(status);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
//!Verifica si el dni ingresado por el usuario existe o no en la DB
//* necesita que se envie el dni a comprobar por BODY
//http://localhost:3001/verification/dni
router.get('/dni', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { dni } = req.body;
    try {
        let status = yield (0, verificationController_1.verificationDNI)(dni);
        //return "ID not available" si el dni ya existe 
        //       "ID available" si esta disponible
        res.send(status);
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
//!Verifica si el dni y email ingresados pertenecen al mismo usuario
//* necesita que se envie dni y email por body
//http://localhost:3001/verification/user
router.get('/user/:dni/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dni, email } = req.params;
        let user = yield (0, verificationController_1.verificationEmailAndDNI)(dni, email);
        if (user !== false) {
            res.send('Correct compatibility');
        }
        else {
            res.send('Incompatible compatibility');
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
exports.default = router;

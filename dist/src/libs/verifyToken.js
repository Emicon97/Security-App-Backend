"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCreation = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    // const authHeader = req.headers['auth-token'] as string;
    // if (!authHeader) return res.sendStatus(401);
    // jwt.verify(authHeader, process.env.TOKEN_SECRET as string, (err: any) => {
    //     console.log(err)
    //     if (err) return res.sendStatus(403);
    next();
    //   })
};
exports.TokenValidation = TokenValidation;
const TokenCreation = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET || 'tokenPass', {
        expiresIn: 60 * 5
    });
};
exports.TokenCreation = TokenCreation;

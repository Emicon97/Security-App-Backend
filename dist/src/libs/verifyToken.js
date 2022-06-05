"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const TokenValidation = (req, res, next) => {
    console.log('HOLAAAAAAAA');
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json('Access denied');
    next();
};
exports.TokenValidation = TokenValidation;

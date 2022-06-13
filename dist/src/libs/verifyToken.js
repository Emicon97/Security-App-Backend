"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.TokenCreation = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
<<<<<<< HEAD
    // const authHeader = req.headers['auth-token'] as string;
    // if (!authHeader) return res.sendStatus(401);
    // jwt.verify(authHeader, process.env.TOKEN_SECRET as string, (err: any) => {
    //     console.log(err)
    //     if (err) return res.sendStatus(403);
    next();
    //   })
=======
    const authToken = req.headers['auth-token'];
    const refreshToken = req.headers['refresh-token'];
    if (!authToken)
        return res.sendStatus(401);
    const { payload, expired } = verifyJWT(authToken);
    if (payload)
        return next();
    const { payload: refresh } = expired && refreshToken ? verifyRefreshJWT(refreshToken) : { payload: null };
    if (!refresh) {
        return res.sendStatus(403);
    }
    const id = req.headers['auth-token'];
    const token = (0, exports.TokenCreation)(id);
    res.cookie('auth-token', token);
    next();
>>>>>>> f422cc5f49efb874bd2fa8705aa2a20460594195
};
exports.TokenValidation = TokenValidation;
const TokenCreation = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET || 'tokenPass', {
        expiresIn: 60
    });
};
exports.TokenCreation = TokenCreation;
const RefreshToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.TOKEN_REFRESH || 'tokenPass', {
        expiresIn: 60 * 60 * 8
    });
};
exports.RefreshToken = RefreshToken;
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        console.log(error.message.includes("jwt expired"));
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
function verifyRefreshJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_REFRESH);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}

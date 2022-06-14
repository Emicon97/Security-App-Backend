import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const TokenValidation = (req: Request, res: Response, next: NextFunction)=>{
    const authToken = req.headers['auth-token'] as string;
    const refreshToken = req.headers['refresh-token'] as string;

    if (!authToken) return res.sendStatus(401);

    const { payload, expired } = verifyJWT(authToken);
    
    if (payload) return next();

    const { payload: refresh } =
        expired && refreshToken ? verifyRefreshJWT(refreshToken) : { payload: null };

    if (!refresh) {
        return res.sendStatus(403);
    }

    const id = req.headers['auth-token'] as string;

    const token = TokenCreation(id);

    res.cookie('auth-token', token)

    next();
}

export const TokenCreation = (id:String) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET as string || 'tokenPass', {
        expiresIn: 60
    });
}

export const RefreshToken = (email:string) => {
    return jwt.sign({email}, process.env.TOKEN_REFRESH as string || 'tokenPass', {
        expiresIn: 60 * 60 * 8
    });
}

function verifyJWT (token:string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        return { payload: decoded, expired: false };
    } catch (error:any) {
        return { payload: null, expired: error.message.includes("jwt expired") };
      }
}

function verifyRefreshJWT (token:string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_REFRESH as string);
        return { payload: decoded, expired: false };
    } catch (error:any) {
        return { payload: null, expired: error.message.includes("jwt expired") };
      }
}
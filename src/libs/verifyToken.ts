import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const TokenValidation = (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers['auth-token'] as string;

    if (!authHeader) return res.sendStatus(401);

    jwt.verify(authHeader, process.env.TOKEN_SECRET as string, (err: any) => {
        console.log(err)

        if (err) return res.sendStatus(403);
        
        next();
      })
}

export const TokenCreation = (id:String) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET as string || 'tokenPass', {
        expiresIn: 60 * 5
    });
}
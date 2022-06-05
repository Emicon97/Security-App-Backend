import { Request, Response, NextFunction } from "express";

export const TokenValidation = (req: Request, res: Response, next: NextFunction)=>{
    console.log('HOLAAAAAAAA')
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access denied');
    next();
}
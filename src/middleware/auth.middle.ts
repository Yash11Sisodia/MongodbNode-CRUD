import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const verifytoken = async (req : Request, res: Response,next : NextFunction) =>
{
const token = req.cookies.token;

if(token){
    jwt.verify(token,process.env.key!, (err: any, value : any) => {
        if(err){
          return  res.status(401).json({message : "not authenticated"})
        }
    return next();
    })
}
}
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifytoken =  (req : Request, res: Response,next : NextFunction) =>
{
const token = req.cookies.toekn;
console.log(req.cookies)
if(token){
    jwt.verify(token,process.env.Key!, (err: any, value : any) => {
        if(err) {
          return  res.status(401).json({message : "not authenticated"})
        }

  else  return next();
    })
}
}
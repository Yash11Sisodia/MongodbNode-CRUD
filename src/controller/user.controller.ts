import User  from "../models/user.model";
import  article from "../models/article.model";
import bcrypt from  'bcrypt'
 import { Request,Response } from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import cookie from 'cookie'

const gentoken=(email : string) => {

return jwt.sign(
    {email},
    "24134",
    {expiresIn : "30m"}
)
}

export const login= async(req : Request, res : Response)=> {
    const {email , password }= req.body;

    try {
        const user = await User.find({email : email});
         if(user){
            const passwordMatches = await bcrypt.compare(password, (user as any).password);
          if(passwordMatches){
            const accesstokrn= gentoken(email);
            res.set("Set-Cookie",cookie.serialize('toekn',accesstokrn, {
                httpOnly : true,
                secure : true,
                sameSite : "strict",
                path : "/"
            }));
            res.status(200).json(user);
          }
         }
        res.status(401).json(user);
    }
        catch(err){
            res.status(500).json({message : 'internal error'});
        }
 }


 export const signUp=async (req : Request, res : Response)=> {
    const {email,password,age,name}= req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const user = await User.create({name,email,hashedPassword,age})
        user.save();
        res.status(200).json(user);
    
        }catch(err){
            res.status(500).json({message : 'internal error'});
    
        }
 }


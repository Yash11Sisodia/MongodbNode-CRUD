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
        res.status(401).json({message : ' not auth'});
    }
        catch(err){
            res.status(500).json({message : 'internal error'});
        }
 }


 export const signUp=async (req : Request, res : Response)=> {
    const {email,password,age,name}= req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const user = await User.create({name,email,password : hashedPassword,age})
        user.save();
        res.status(200).json(user);
    
        }catch(err){
            res.status(500).json({message : 'internal error'});
    
        }
 }


 export const updateProfile=async (req : Request, res : Response)=> {
    let curemail = req.cookies.email;
    const curuser = await User.findOne({email : curemail});
    if(curuser) {
    let {email,password,age,name}= req.body;
    email = email === null ? curuser?.email : email;

    let hashedPassword;
    if(password!= null){
         hashedPassword = await bcrypt.hash(password,10);
    
    }else hashedPassword = curuser?.password 

    age = age === null ? curuser?.age : age;
    name = name === null ? curuser?.name : name;


    try {
        const user = await User.updateOne({email : email},{name,email, password : hashedPassword,age})
        
        res.status(200).json(user);
    
        }catch(err){
            res.status(500).json({message : 'internal error'});
    
        }
    }else {
        res.status(401).json({message : 'not auth'});

    }
 }


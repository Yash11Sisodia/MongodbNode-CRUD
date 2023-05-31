import User  from "../models/user.model";
import  article from "../models/article.model";
import bcrypt from  'bcrypt'
 import { Request,Response } from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import cookie from 'cookie'

const gentoken=(email : string) => {

return jwt.sign(
    {email},
    process.env.Key!,
    {expiresIn : "30d"}
)
}

export const login= async(req : Request, res : Response)=> {
    const {email , password }= req.body;

    try {
        const user = await User.findOne({email : email});
         if(user){
            const passwordMatches = await bcrypt.compare(password, (user as any).password);
          if(passwordMatches){
            const accesstokrn= gentoken(email);
            res.set("Set-Cookie",cookie.serialize('toekn',accesstokrn, {
                httpOnly : true,
                secure : false,
                sameSite : "strict",
                path : "/"
            }));
         return  res.status(200).json({statusCode:200,data:user});
          }
         }
         return  res.status(401).json({message : ' not auth'});
    }
        catch(err){
            console.log(err);
            return   res.status(500).json({message : 'internal error',error:err?.name});
        }
 }


 export const signUp=async (req : Request, res : Response)=> {
    const {email,password,age,name}= req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const user = await User.create({name,email,password : hashedPassword,age})
        user.save();
        return   res.status(200).json({statusCode:200,data:user});
    
        }catch(err){
            console.log(err);

            return    res.status(500).json({message : 'internal error',error:err?.name});
    
        }
 }


 export const updateProfile=async (req : Request, res : Response)=> {
    let curid = req.params.userId;
    const curuser = await User.findById(curid);
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
        
        res.status(200).json({message:user,statusCode:200});
    
        }catch(err){
            console.log(err);

            res.status(500).json({message : 'internal error',error:err?.name});
    
        }
    }else {
        
        res.status(401).json({message : 'not auth'});

    }
 }


import User  from "../models/user.model";
import  Article from "../models/article.model";
 import { Request,Response } from "express";



 export const cretaArticle= async(req : Request, res : Response)=> {
    try {
    const {text}=   req.body;
    const userId=   req.params.userId

    const article = await Article.create({text,userId});
    article.save();
   return res.status(200).json({statusCode:200,data:article});

    }  catch(err){
        console.log(err);

        return res.status(500).json({message : 'internal error',error:err?.name});

    }
 }

 export const getArticle=async (req : Request, res : Response)=> {
    const id = req.params.userId
    try {
        const articles = await Article.find({userId : id});
        return res.status(200).json({statusCode:200,data:articles});}
        catch(err){
            console.log(err);

            return res.status(500).json({message : 'internal error',error:err?.name});
        }
 }

 
 export const getArticles= async(req : Request, res : Response)=> {
    try {
    const articles = await Article.find({});
    return res.json({statusCode:200,data:articles});}
    catch(err){

        return res.status(500).json({message : 'internal error',error:err?.name});
    }
 }
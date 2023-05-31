import User  from "../models/user.model";
import  Article from "../models/article.model";
 import { Request,Response } from "express";



 export const cretaArticle= async(req : Request, res : Response)=> {
    try {
    const {text}=   req.body;
    const userId=   req.params.userId

    const article = await Article.create({text,userId});
    article.save();
   return res.status(200).json(article);

    }  catch(err){
        console.log(err);

        return res.status(500).json({message : 'internal error'});

    }
 }

 export const getArticle=async (req : Request, res : Response)=> {
    const id = req.params.userId
    try {
        const articles = await Article.find({userId : id});
        return res.status(200).json(articles);}
        catch(err){
            console.log(err);

            return res.status(500).json({message : 'internal error'});
        }
 }

 
 export const getArticles= async(req : Request, res : Response)=> {
    try {
    const articles = await Article.find({});
    return res.json(articles);}
    catch(err){
        console.log(err);

        return res.status(500).json({message : 'internal error'});
    }
 }
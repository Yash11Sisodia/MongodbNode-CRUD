import User  from "../models/user.model";
import  Article from "../models/article.model";
 import { Request,Response } from "express";



 export const cretaArticle= async(req : Request, res : Response)=> {
    try {
    const {userId,text}= req.body;
    const article = await Article.create({text,userId});
    article.save();
    res.status(200).json(article);

    }catch(err){
        res.status(500).json({message : 'internal error'});

    }
 }

 export const getArticle=async (req : Request, res : Response)=> {
    const id = req.params.userId
    try {
        const articles = await Article.find({userId : id});
        res.json(articles);}
        catch(err){
            res.status(500).json({message : 'internal error'});
        }
 }

 
 export const getArticles= async(req : Request, res : Response)=> {
    try {
    const articles = await Article.find({});
    res.json(articles);}
    catch(err){
        res.status(500).json({message : 'internal error'});
    }
 }
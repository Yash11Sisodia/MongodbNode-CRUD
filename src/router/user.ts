import { Router } from "express";
import { cretaArticle, getArticle, getArticles } from "../controller/article.controller";
import { verifytoken } from "../middleware/auth.middle";
import { updateProfile } from "../controller/user.controller";
import { create } from "ts-node";

const app =Router();


app.post("/:userId/articles/",verifytoken,cretaArticle );
app.post("/:userId/", verifytoken,updateProfile);


export default app;
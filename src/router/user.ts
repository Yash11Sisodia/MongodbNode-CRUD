import { Router } from "express";
import { getArticle, getArticles } from "../controller/article.controller";
import { verifytoken } from "../middleware/auth.middle";
import { updateProfile } from "../controller/user.controller";

const app =Router();


app.use("/:userId/articles",verifytoken,getArticle );
app.use("/:userId/", verifytoken,updateProfile);


export default app;
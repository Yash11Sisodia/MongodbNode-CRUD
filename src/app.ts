import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();
import { login, signUp } from './controller/user.controller';
import { getArticles } from './controller/article.controller';
import userRouter from './router/user'
import { verifytoken } from './middleware/auth.middle';

const app =express();
app.use(cors({   
     credentials: true,
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/login",login);
app.use("/api/signup",signUp);
app.use("/api/users",userRouter);
app.use("/api/articles",verifytoken,getArticles);



app.listen(3000,async ()=>{
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }as ConnectOptions);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error((err as any).message);
        process.exit(1);
    }
})
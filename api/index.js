import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser())
app.listen(3000, ()=>{
    console.log('Listening on port the 3000')
})
app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);

// adding middelware for error handling
app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode ,
        message
    })
})

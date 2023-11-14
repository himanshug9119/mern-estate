import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'

const hash_password_times = 10;
export const signup = async (req , res, next)=>{
    const {username , email, password} = req.body;
    const hasedPassword = bcryptjs.hashSync(
      password,
      hash_password_times
    );
    const newUser = new User({ username, email, password:hasedPassword });
    try {
        await newUser.save();
        res.status(201).json({"Message":"User registered successfully"})
    } catch (error) {
        next(error);
    }
}
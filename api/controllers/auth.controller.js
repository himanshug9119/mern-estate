import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

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

export const signin = async (req , res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({"Message":"Please provide username and password"})
    }
    let user ;
    try{
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404 , 'User Not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Credentials!"));
        
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);
    }catch(err){
        next(err)
    }
};
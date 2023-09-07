import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY


const authorization = async (req,res,next) => {
    try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, SECRET_KEY);
    
    const currentUser = await User.findById(decodedToken.userId);

    req.user = currentUser;

    next()
    } catch (error) {
    res.json(error.message)
    }
    
}


export default authorization;
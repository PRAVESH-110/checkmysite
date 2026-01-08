import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authMiddleware(req, res, next){

    const token =req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message:"unauth"
        })
    }
    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({
            message:"invalid token"
        })
    }
}

export default authMiddleware;
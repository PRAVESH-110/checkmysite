import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized to access this route"
        })
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Malformed authorization header"
        })
    }
    console.log("AUTH HEADER:", req.headers.authorization);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log("RECEIVED TOKEN:", token);
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "You must signup first "
        })
    }
}

export default authMiddleware;
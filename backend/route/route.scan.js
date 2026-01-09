import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {z} from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const scanRouter = express.Router();
scanRouter.use(express.json());

const scanSchema= z.object({
    url:z.string().url()
})

scanRouter.post("/scan",authMiddleware,async function(req,res){

})

export default scanRouter;
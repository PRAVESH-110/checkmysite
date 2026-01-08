import express from "express";
import {User} from "./model/model.user.js"
import {z} from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();
app.use(express.json());

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "password must be at least 6 characters long"),
    fname: z.string(),
    lname: z.string(),
});
const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required")
});

userRouter.post('/signup',async function(req,res){

    //validate input using parse first
    const validatedData = signupSchema.safeParse(req.body);

    if(!validatedData.success){
        return res.status(400).json({
            message: validatedData.error.message
        })
    }
    const existingUser= await User.findOne({email});

    if ( !email || !password){
        res.status(400).json({
            message: "enter all the credentials"
        })
    }

    if(existingUser){
        return res.status(409).json({
            message:"user already exists, signin !"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
        email:validatedData.email,
        password:hashedPassword,
        fname: validatedData.fname,
        lname: validatedData.lname
    })
    return res.status(201).json({
        message:"user created"
    })

})


userRouter.post('/signin',async function(req,res){
    //validate inputs
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.errors
    });
  }

    const {email, password}= result.data;

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }


    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        { expiresIn: "1h" });

    const verifiedUser = jwt.verify(token,{email});

    return res.status(200).json({
        message:"signin successful",
        token:token,
    })
})

export default adminRouter;

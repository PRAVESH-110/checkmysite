import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {Scan} from "../model/model.scan.js"
import {z} from "zod";
import processScan from "../jobHandler/processScan.js";


const scanRouter = express.Router();

const scanSchema= z.object({
    url:z.string().url("invalid url"),
})

scanRouter.post("/scan",authMiddleware,async function(req,res){
    const validatedData= scanSchema.safeParse(req.body);

    if(!validatedData.success){
        return res.status(400).json({
            message:"invalid input",
            errors:validatedData.error.errors
        })
    }

    const {url}= validatedData.data;

    const scan=await Scan.create({
        userId: req.userId,
        url,
        status:"pending",
    })

    processScan(scan._id);


    return res.status(200).json({
        message:"Scan created successfully",
        scanId:scan._id,
        status: scan.status,

    })
})

scanRouter.get('scan/:scanId',async function (req,res){
    const scanId= req.params.scanId;

    const scan =await Scan.findById(scanId);

    if(!mongoose.Types.ObjectId.isValid(scanId)){
        return res.status(400).json({
            message:"invalid scan id"
        })
    }
    if(!scan){
        return res.status(404).json({
            message:"scan not found"
        })
    }
    if(scan.userId.toString() !== req.userId){
        return res.status(403).json({
            message:"you are not authorized to view this scan"
        })
    }
    const response = {
        status: scan.status
    };

    if (scan.status === "completed") {
    response.score = scan.score;
    response.issues = scan.issues;
    response.signals = scan.signals;
  }

  if (scan.status === "failed") {
    response.error = scan.errors || "Scan failed";
  }

    return res.status(200).json({
        response
    })
})

export default scanRouter;
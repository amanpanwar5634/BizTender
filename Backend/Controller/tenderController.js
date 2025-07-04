import Company from "../Models/CompanyModel.js";
import {v2 as cloudinary } from "cloudinary";
import Tender from "../Models/TenderModel.js";
//create a new tnder for a company
export const createTender=async(req,res)=>{
    try{ const {title,industry,budget,requirements,description,deadline}=req.body;
    const company=await Company.findOne({owner:req.auth().userId});
    if(!company) return res.json({success:false,message:"No Company Found"});
    //upload images to cloudinary
    const uploadImages=req.files.map(async(file)=>{
        const response=await cloudinary.uploader.upload(file.path);
        return response.secure_url;
    })
    //wait for all uploads to complete
    const documents=await Promise.all(uploadImages);
    await Tender.create({
        title,
        industry,
        description,
        company:company._id,
        budget:+budget,
        deadline,
        requirements,
        documents,
    })
    res.json({success:true,message:"Tender created Successfully"});
    }catch(err){
        console.log("errr",err.message);
   res.json({success:false,message:err.message});
    }
}
//api to get all tenders
export const  getTenders=async(req,res)=>{
try{
    const tenders=await Tender.find({isOpen:true}).populate({
     path:'company',
     populate:{path:'owner',select:'document'},
    }).sort({createdAt:-1})
    res.json({success:true,tenders});
}
catch(err){
    console.log("error->",err.message);
    res.json({success:false,message:err.message});
}
}
//all rooms for a specific company
export const getOwnerTenders=async(req,res)=>{
try{ const companyData=await Company.findOne({owner:req.auth().userId})
const tenders=await Tender.find({company:companyData._id.toString()}).populate("company");
res.json({success:true,tenders});
}catch(err){
    console.log("error-.",err.message);
    res.json({success:false,message:err.message});
}
}
//to toggle availability of a room
export const toggleTenderAvailability=async(req,res)=>{
try{
    const {tenderId}=req.body;
    const tenderData=await Tender.findById(tenderId);
 
    tenderData.isOpen=!tenderData.isOpen;
    await tenderData.save();
    res.json({success:true,message:"tender availablility updated"});
}catch(err){
    console.log("error->",err.message);
    res.json({success:false,message:err.message});
}
}
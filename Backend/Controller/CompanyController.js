 import Company from "../Models/CompanyModel.js";
import Tender from "../Models/TenderModel.js";
 import User from "../Models/UserModel.js";
import {v2 as cloudinary } from "cloudinary";
export const registerCompany = async (req, res) => {
  try {
    const { name, address, contact, city, industry, website,about } = req.body;
    const owner = req.user._id;

    // ✅ Check if already registered
    const companyExists = await Company.findOne({ owner });
    if (companyExists) {
      return res.json({ success: false, message: "Company already Registered" });
    }

    // ✅ Upload logo image if present
    let logoUrl = "";
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      const logoUpload = await cloudinary.uploader.upload(req.files.logo[0].path);
      logoUrl = logoUpload.secure_url;
    }

    // ✅ Upload gallery images if present
    let galleryUrls = [];
    if (req.files && req.files.gallery && req.files.gallery.length > 0) {
      const uploadGallery = req.files.gallery.map(async (file) => {
        const uploaded = await cloudinary.uploader.upload(file.path);
        return uploaded.secure_url;
      });
      galleryUrls = await Promise.all(uploadGallery);
    }

    // ✅ Create company with images
    await Company.create({
      name,
      address,
      contact,
      city,
      industry,
      website,
      owner,
      logo: logoUrl,
      gallery: galleryUrls,
      about,
    });

    // ✅ Optionally update user role to companyOwner
    await User.findByIdAndUpdate(owner, { role: "companyOwner" });

    res.json({ success: true, message: "Company Registered Successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};
//all rooms for a specific company
export const getOwnerCompany=async(req,res)=>{
try{ 
   const OwnerCompany=await Company.findOne({owner:req.auth().userId});
console.log("owner compnay->",OwnerCompany);
res.json({success:true,OwnerCompany});
}catch(err){
    console.log("error-.",err.message);
    res.json({success:false,message:err.message});
}
}
//get company for particualr tender
export const getCompany=async(req,res)=>{
  try{
    const {tenderId}=req.params;
    const tender=await Tender.findById(tenderId).populate("company");
    if(!tender){
      res.json({success:false,message:"no such tender exist for this company"});return;
    }
    const company=tender.company;
    if(!company){
      res.json({success:false,message:"no such company for this tender"});
     return;
    }
    console.log("tender company",company);
    res.json({success:true,company});
    
  }catch(err){
    res.json({success:false,message:err.message});
  }
}

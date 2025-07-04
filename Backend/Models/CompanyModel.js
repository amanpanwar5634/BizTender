import mongoose from "mongoose";
const CompanySchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:String,required:true},
    owner:{type:String,required:true,ref:"User"},
    city:{type:String,required:true},
    industry:{type:String,required:true},
    website:{type:String,required:true},
    gallery:[{type:String}],
    logo:{type:String,required:true},
    about:{type:String,required:true},
},{timestamps:true});
const Company=mongoose.model("Company",CompanySchema);
export default Company;
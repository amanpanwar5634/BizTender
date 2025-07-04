import User from "../Models/UserModel.js";
//check middlware is authenticatd ornot
export const protect=async(req,res,next)=>{
    const {userId}=req.auth();
   
    if(!userId) res.json({success:false,message:"not authenticated"});
    else{
        const user=await User.findById(userId);
        console.log("user from the User model",user);
        req.user=user;
        next();
    }
}
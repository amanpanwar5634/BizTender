export const getUserData=async(req,res)=>{
try{ console.log("req->user form getUSERDATA->",req.user);
    const role=req.user.role;
    const recentSearchedIndustries=req.user.recentSearchedIndustries;
    res.json({success:true,role,recentSearchedIndustries})
}
catch(err){
res.json({success:false,message:err.message});
}
}
//STORE user Recent searched Cities
export const storeRecentSearchedTenders=async(req,res)=>{
    try{
         const {recentSearchedIndustry}=req.body;
         const user=await req.user;
         if(user.recentSearchedIndustries.length<3){
            user.recentSearchedIndustries.push(recentSearchedIndustry);
         }
         else{
            user.recentSearchedIndustries.shift();
            user.recentSearchedIndustries.push(recentSearchedIndustry);
         }
         await user.save();
         res.json({success:true,message:"city added"});
    }
    catch(err){
        res.json({success:false,message:err.message});
    }
}
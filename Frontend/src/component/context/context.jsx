import axios from "axios";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, useUser} from "@clerk/clerk-react"
import { useState,useEffect } from "react";
import { createContext } from "react";
import {toast} from "react-hot-toast";
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
const AppContext=createContext();
export const AppProvider=({children})=>{
    const navigate=useNavigate();
    const {user}=useUser();
    const{getToken}=useAuth();
    const [isOwner,setIsOwner]=useState(false);
   const [showCompanyReg,setShowCompanyReg]=useState(false);
   const [searchedIndustries,setSearchedIndustries]=useState([]);
   const [tenders, setTenders] = useState([]);

  const fetchTenders = async () => {
    try {
      const { data } = await axios.get("/api/tenders");
      if (data.success) {  setTenders(data.tenders); console.log("Tenders from API:", data.tenders);
 } else {toast.error(data.message); }
    } catch (err) {
      console.error("Error fetching tenders:", err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);
  
  const fetchUser=async()=>{
   try{ const {data}=await axios.get("/api/user",{headers:{Authorization:`Bearer ${await getToken()}`}})
   console.log("data->from api/usr",data);
if(data.success){setIsOwner(data.role=="companyOwner");setSearchedIndustries(data.recentSearchedIndustries)}
else{
    setTimeout(()=>{
        fetchUser()
    },5000)
}}
catch(err){
    console.log("err in fetchuser->",err);
toast.error(err.message);
      } 
 }
useEffect(()=>{if(user){fetchUser();} },[user])
const value={
axios,user,navigate,getToken,isOwner,showCompanyReg,
setShowCompanyReg,setIsOwner,tenders,setTenders,setSearchedIndustries,searchedIndustries
    }
return (
     <AppContext.Provider value={value}>
        {children}
     </AppContext.Provider>
)
}
export const useAppContext=()=>useContext(AppContext);
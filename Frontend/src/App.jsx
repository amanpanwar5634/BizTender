 import React from "react";
 import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home/Home";
import Footer from "./component/Footer";
import AllTenders from "./component/AllTenders/AllTenders";
import TenderDetail from "./component/TenderDetails";
import MyApplications from "./component/MyApplications";
import TenderDashboard from "./component/CompanyOwner/TenderDashboard";
import AddTender from "./component/CompanyOwner/AddTender";
 
import TenderOwner from "./component/CompanyOwner/TenderOwner";
 
import { useAppContext } from "./component/context/context";
import CompanyRegModal from "./component/CompanyReg";
import ListTender from "./component/CompanyOwner/ListTender";
import { Toaster } from "react-hot-toast";
import OwnerCompanyProfile from "./component/CompanyOwner/OwnerCompanyProfile";
import CompanyofTender from "./Company/CompanyofTender";
import TenderApplication from "./component/CompanyOwner/TenderApplication";
 export default function App() {
    const isownerPath = useLocation().pathname.includes("owner");
    const {showCompanyReg,setShowCompanyReg}=useAppContext();
  return (
  <>
  <div>
    <Toaster/>
    {!isownerPath && <Navbar/>}
    {showCompanyReg && <CompanyRegModal/>}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tenders" element={<AllTenders/>}/>
            <Route path="/tenders/:id" element={<TenderDetail/>}/>
             <Route path='my-applications' element={<MyApplications/>} />
             <Route path='company-profile' element={<OwnerCompanyProfile/>} />
             <Route path="/owner" element={<TenderOwner/>}>
        <Route index element={<TenderDashboard />} />
        <Route path="add-tender" element={<AddTender />} />
        <Route path="list-tender" element={ <ListTender/>} />
      </Route>
      <Route path="/tendercompany/:id" element={<CompanyofTender/>}/>
      <Route path="/tender-application" element={<TenderApplication/>}/>
    </Routes>
    <Footer/>
  </div>
    </>
  

  )
}
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
import TenderList from "./component/AllTenders/TenderList";
import TenderOwner from "./component/CompanyOwner/TenderOwner";
import ApplicationList from "./component/CompanyOwner/ApplicationList";
 export default function App() {
    const isownerPath = useLocation().pathname.includes("owner");
  return (
  <>
  <div>
    {!isownerPath &&    <Navbar/>}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tenders" element={<AllTenders/>}/>
            <Route path="/tenders/:id" element={<TenderDetail/>}/>
             <Route path='my-applications' element={<MyApplications/>} />
             <Route path="/owner" element={<TenderOwner/>}>
        <Route index element={<TenderDashboard />} />
        <Route path="add-tender" element={<AddTender />} />
        <Route path="list-tender" element={<ApplicationList />} />
      </Route>
    </Routes>
    <Footer/>
  </div>
    </>
  

  )
}
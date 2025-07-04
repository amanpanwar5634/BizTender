import React from "react"; 
import { Outlet } from "react-router-dom";
import SideBarMenu from "./SideBarMenu.jsx";
export default function OwnerContent() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] pt-20">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow">
        <SideBarMenu/>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

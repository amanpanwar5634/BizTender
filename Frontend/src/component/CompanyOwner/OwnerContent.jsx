import React from "react";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";

export default function OwnerContent() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] pt-20">
      <div className="hidden md:block w-64 bg-white shadow">
        <SidebarMenu />
      </div>
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

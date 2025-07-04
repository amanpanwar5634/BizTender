import { UserButton } from "@clerk/clerk-react";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { assets } from "../../assets/assets";

export default function OwnerNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sideBarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Tender", path: "/owner/add-tender", icon: assets.addIcon },
    { name: "List Tenders", path: "/owner/list-tender", icon: assets.listIcon },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Hamburger toggles dropdown on mobile */}
          <HiMenu
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="md:hidden w-8 h-8 cursor-pointer"
          />
          <a href="/" className="font-bold text-xl text-blue-800">
            BizTender
          </a>
        </div>
        <UserButton />
      </div>

      {/* Mobile dropdown menu */}
      {isDropdownOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {sideBarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={() => setIsDropdownOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5" />
              <span className="text-base">{item.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

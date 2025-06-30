import { UserButton } from "@clerk/clerk-react";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { assets } from "../../assets/assets";

export default function OwnerNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between">
      <div className="flex items-center gap-4">
        <HiMenu onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="md:hidden" />
        <a href="/" className="font-bold text-xl text-blue-800">TenderFinder</a>
      </div>
      <UserButton />
    </div>
  );
}

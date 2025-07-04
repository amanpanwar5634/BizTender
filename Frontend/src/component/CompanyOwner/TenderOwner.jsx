import React, { useEffect } from "react";
import OwnerNavbar from "./OwnerNavbar";
import OwnerContent from "./OwnerContent";
import { useAppContext } from "../context/context";
export default function TenderOwner() {
  const { isOwner, navigate, setIsOwner, axios, getToken } = useAppContext();
useEffect(() => {
    const checkRole = async () => {
      const { data } = await axios.get("/api/user/me", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.user.role === "companyOwner") {
        setIsOwner(true);
      }
    };
    checkRole();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <OwnerNavbar />
      <div className="mt-6 md:mt-6">
        <OwnerContent />
      </div>
    </div>
  );
}

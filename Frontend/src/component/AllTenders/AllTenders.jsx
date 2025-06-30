import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideBar from "./Sidebar";// ✅ Keep your sidebar filters
import TenderList from "./TenderList"; // ✅ Updated list component for tendersIM
 import { tendersDummyData } from "../../assets/assets";
export default function AllTenders() {
  const [searchParams] = useSearchParams();

  // ✅ Filters
  const [filters, setFilters] = useState({
    budgetRange: [],
    industries: [],
    sortBy: "",
  });

  // ✅ Get location or keyword from URL
  const keyword = searchParams.get("q");

  // ✅ First filter by keyword (title, description, location, industry)
  const keywordFilteredTenders = tendersDummyData?.filter((tender) => {
    if (!keyword) return true;
    return (
      tender.title.toLowerCase().includes(keyword.toLowerCase()) ||
      tender.description.toLowerCase().includes(keyword.toLowerCase()) ||
      tender.location.toLowerCase().includes(keyword.toLowerCase()) ||
      tender.industry.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  // ✅ Then apply budget range, industries, and sorting filters
  const filteredTenders = keywordFilteredTenders
    ?.filter((tender) => {
      // Budget filter
      if (filters.budgetRange.length) {
        const match = filters.budgetRange.some((range) => {
          if (range === "0-50000") return tender.budget <= 50000;
          if (range === "50000-100000")
            return tender.budget > 50000 && tender.budget <= 100000;
          if (range === "100000+")
            return tender.budget > 100000;
          return true;
        });
        if (!match) return false;
      }

      // Industry filter
      if (
        filters.industries.length &&
        !filters.industries.includes(tender.industry)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh") return a.budget - b.budget;
      if (filters.sortBy === "highToLow") return b.budget - a.budget;
      if (filters.sortBy === "deadline")
        return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });

  return (
    <div className="mt-16 md:mt-16 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-[30%]">
        <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-auto shadow-lg bg-white">
          <SideBar filters={filters} setFilters={setFilters} />
        </div>
      </div>

      {/* TenderList */}
      <div className="w-full md:w-[70%] px-4">
        <TenderList data={filteredTenders} />
      </div>
    </div>
  );
}

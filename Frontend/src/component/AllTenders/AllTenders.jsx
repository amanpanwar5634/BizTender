import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/context";
import SideBar from "./Sidebar";
import TenderList from "./TenderList";

export default function AllTenders() {
  const { tenders } = useAppContext(); // ✅ Tenders from context
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    budgetRange: [],
    industries: [],
    sortBy: "",
  });

  // ✅ Get industry and keyword from URL
  const industryParam = searchParams.get("industry");
  const keywordParam = searchParams.get("keyword");

  // ✅ First filter tenders by industry & keyword param (if any)
  const industryAndKeywordFiltered = tenders?.filter((tender) => {
    // Industry filter
    const industryMatch =
      !industryParam ||
      tender.industry?.toLowerCase().includes(industryParam.toLowerCase());

    // Keyword filter: check in title and description
    const keywordMatch =
      !keywordParam ||
      tender.title?.toLowerCase().includes(keywordParam.toLowerCase()) ||
      tender.description?.toLowerCase().includes(keywordParam.toLowerCase());

    return industryMatch && keywordMatch;
  });

  // ✅ Then apply budget range, sidebar industries, and sorting
  const filteredTenders = industryAndKeywordFiltered
    ?.filter((tender) => {
      // Budget Filter
      if (filters.budgetRange.length) {
        const match = filters.budgetRange.some((range) => {
          if (range === "0-50000") return tender.budget <= 50000;
          if (range === "50000-100000")
            return tender.budget > 50000 && tender.budget <= 100000;
          if (range === "100000+") return tender.budget > 100000;
          return true;
        });
        if (!match) return false;
      }

      // Industry sidebar filter (if selected)
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

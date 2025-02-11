"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { Budget } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react"; // Import menu icon

export default function Dashboardlayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db.select()
      .from(Budget)
      .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-600 p-2 rounded-md hover:bg-gray-200"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar for larger screens */}
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>

      {/* Sidebar for small screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-64 h-full bg-white shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
            <SideNav />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64">
      {/* <div className="fixed md:w-[84%] hidden md:block">
      <DashboardHeader />
        </div> */}
        
        {children}
      </div>
    </div>
  );
}



import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardSidebar>{children}</DashboardSidebar>
    </div>
  );
};

export default DashboardLayout;

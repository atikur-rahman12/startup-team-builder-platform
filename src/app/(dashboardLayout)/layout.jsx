import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Toaster
        position="top-center"
        expand
        richColors
        closeButton
        duration={2500}
      />
      <DashboardSidebar>{children}</DashboardSidebar>
    </div>
  );
};

export default DashboardLayout;

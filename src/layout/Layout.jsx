import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DBoardHeader from "../dash_board_header/DashBoardHeader";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* ✅ Fixed Sidebar with theme support */}
      <aside className="w-64 h-screen fixed left-0 top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
        <Sidebar />
      </aside>

      {/* ✅ Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* ✅ Sticky Header with theme support */}
        <header className="sticky top-0 z-40 bg-gray-100 dark:bg-gray-900 shadow px-6 pt-4">
          <DBoardHeader />
        </header>

        {/* ✅ Scrollable Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

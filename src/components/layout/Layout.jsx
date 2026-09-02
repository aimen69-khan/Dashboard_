import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "../../pages/home/Home.css";

export default function DashboardLayout() {
  return (
    <div className="ds-app">
      <SideBar />
      <div className="ds-main">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
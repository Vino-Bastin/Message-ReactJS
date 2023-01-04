import React from "react";
import { Outlet } from "react-router-dom";
import NavBarLayout from "./NavBarLayout";
import UserProfileLayout from "./UserProfileLayout";

const MainLayout = () => {
  return (
    <main className="h-screen flex">
      <NavBarLayout />
      <section id="posts" className="h-screen w-2/4 border-r overflow-y-auto">
        <Outlet />
      </section>
      <UserProfileLayout />
    </main>
  );
};

export default MainLayout;

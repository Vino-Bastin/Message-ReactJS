import React, { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavButtonsInterface {
  children: ReactNode;
  label: string;
}

const NavButtons: React.FC<NavButtonsInterface> = ({ children, label }) => {
  const location = useLocation();

  const to = label.toLocaleLowerCase().split(" ").join("");

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "font-bold active-btn" : undefined
      }
      state={{ from: location.pathname }}
    >
      <button className="mt-4 text-lg p-2 w-40 rounded-3xl hover:bg-green-300 flex">
        {children}
        <p className="ml-4">{label}</p>
      </button>
    </NavLink>
  );
};

export default NavButtons;

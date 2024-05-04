import { Outlet } from "react-router-dom";
import "../assets/css/Header.css";
import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <div className="header">
        <h1>自己紹介</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import popup from "../styles/popup.module.css";
import hamburger from "../assets/logos/hamburger.png";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";

const PopupMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(!isOpen);
  };

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("registerToken")
    localStorage.removeItem("loginToken")

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className={popup.popupContainer}>
      <img
        src={hamburger}
        width={20}
        height={20}
        className={popup.toggleButton}
        onClick={openPopup}
      ></img>
      {isOpen && (
        <div className={popup.menu}>
          <p className={popup.name}>{username}</p>
          <button onClick={handleLogout} className={popup.logoutbtn}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;

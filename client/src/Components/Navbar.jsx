import React, { Fragment, useEffect, useState } from "react";
import navbar from "../styles/navbar.module.css";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import profile from "../assets/images/profile.png";
import bookmark from "../assets/logos/bookmark.png";
import Popup from "./PopUp";
import AddStory from "./AddStory";
import { useNavigate } from "react-router-dom";
import hamburger from "../assets/logos/hamburger.png";
import close from "../assets/logos/close.png";

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setRegister] = useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const registerToken = localStorage.getItem("registerToken");

    if (loginToken || registerToken) {
      setLoggedIn(true);
      setRegister(true);
    } else {
      setLoggedIn(false);
      setRegister(false);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegistration = () => {
    setLoggedIn(true);
    setRegister(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRegister(false);
  };

  const navigate = useNavigate();

  const toggleHamburger = () => {
    setHamburgerOpen(!isHamburgerOpen);
  };

  const closeHamburger = () => {
    setHamburgerOpen(false);
  };

  return (
    <div className={navbar.container}>
      <h1 className={navbar.heading}>SwipTory</h1>

      {/* render hamburger icon only on mobile devices */}
      <img
        src={hamburger}
        width={20}
        height={20}
        className={`${navbar.hamburger} ${isHamburgerOpen ? navbar.open : ""}`}
        onClick={toggleHamburger}
      />

      {/* render hamburger menu only on mobile devices when it's open */}
      {isHamburgerOpen && (
        <Fragment>
          <img
            src={close}
            width={20}
            height={20}
            className={navbar.close}
            onClick={closeHamburger}
          ></img>

          <div className={navbar.hamburgerMenu}>
            {isLoggedIn || isRegistered ? (
              <Fragment className={navbar.mobileview}>
                <h1 className={navbar.mobilehead}>Swiptory</h1>
                <div className={navbar.profilemobile}>
                  <img
                    src={profile}
                    alt="profile-icon"
                    onClick={() => navigate("/")}
                    className={navbar.profile}
                  ></img>
                  <h2 className={navbar.name}>{username}</h2>
                </div>
                <button
                  className={navbar.bookmark}
                  onClick={() => navigate("/bookmark")}
                >
                  <img
                    src={bookmark}
                    alt="bookmark-icon"
                    width={20}
                    height={18}
                    className={navbar.bookmarkicon}
                  ></img>
                  Bookmarks
                </button>

                <AddStory />
                <br/>
                <button
                  onClick={handleLogout}
                  className={navbar.logoutbtnmobile}
                >
                  Logout
                </button>
              </Fragment>
            ) : (
              // Display login and register buttons
              <Fragment>
                <LoginButton
                  onLogin={handleLogin}
                  className={navbar.loginbtn}
                />
                <RegisterButton
                  onRegister={handleRegistration}
                  className={navbar.registerbtn}
                />
              </Fragment>
            )}
          </div>
        </Fragment>
      )}

      {isLoggedIn || isRegistered ? (
        <div className={navbar.buttons}>
          <button
            className={navbar.bookmark}
            onClick={() => navigate("/bookmark")}
          >
            <img
              src={bookmark}
              alt="bookmark-icon"
              width={20}
              height={18}
              className={navbar.bookmarkicon}
            ></img>
            Bookmarks
          </button>
          <AddStory />
          <img
            src={profile}
            alt="profile-icon"
            onClick={() => navigate("/")}
            className={navbar.profile}
          ></img>
          <Popup onLogout={handleLogout} />
        </div>
      ) : (
        <Fragment>
          <RegisterButton onRegister={handleRegistration}></RegisterButton>
          <LoginButton onLogin={handleLogin}></LoginButton>
        </Fragment>
      )}
    </div>
  );
}

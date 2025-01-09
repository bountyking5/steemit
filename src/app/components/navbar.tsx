"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./logo";
import SearchBar from "./searchBar";
import Login from "./loginModal";
import MenuToggle from "./menuToggle";
import SideMenu from "./sideManuBar";
import Signup from "./signup";
import Sidenav from "./sidenav";
import MobileManubar from "./mobileManubar";
import NotificationIcon from "./notification";
import ProfileAvatar from "./profileAvatar";
import Posticon from "./postIcon";
import { logout } from "@/libs/reduxToolkit/authSlice"; // Import the logout action

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Access Redux state for authentication and user das
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  // Handle local session persistence
  useEffect(() => {
    setShowNotification(Boolean(user));
  }, [user]);

  // Handle Logout
  const handleLogout = (): void => {
    dispatch(logout());
    setShowNotification(false);
  };

  // Toggle side menu
  const handleNav = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="fixed w-full h-16 shadow-xl bg-cyan-950 z-10 top-0 md:rounded-bl-lg md:rounded-br-lg md:ml-1">
        <div className="flex justify-between items-center h-full w-full pr-4 md:pr-6 2xl:pr-8">
          <Logo />
          <div className="flex flex-wrap gap-1 sm:gap-4 items-center">
            <SearchBar />
            <Posticon />
            {!isAuthenticated ? (
              <>
                <Login />
                <Signup />
              </>
            ) : (
              <>
                {/* <Posticon /> */}
                {showNotification && <NotificationIcon />}
                <ProfileAvatar />
                {/* <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 px-4 py-2 rounded-md"
                >
                  Logout
                </button> */}
              </>
            )}
            <MenuToggle menuOpen={menuOpen} handleNav={handleNav} />
            <Sidenav />
          </div>
          <SideMenu menuOpen={menuOpen} handleNav={handleNav} />
        </div>
      </nav>

      <MobileManubar />
    </div>
  );
};

export default Navbar;

import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { FaWallet, FaUsers, FaMicroblog } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/libs/utils/authFunctions";
import { logout } from "@/libs/reduxToolkit/authSlice";

const UserSideMenu = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.auth); // Getting auth state from Redux

  // const onLogout = () => {
  //   handleLogout(dispatch); // Call handleLogout with the dispatch function
  // };

    const handleLogout = (): void => {
      dispatch(logout());

    };

  return (
    <ul className="space-y-2 p-5">
      {/* My Profile */}
      <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
        <CgProfile className="w-5 h-5 mr-2" />
        My Profile
      </li>

      {/* My Friends Posts */}
      <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
        <FaMicroblog className="w-5 h-5 mr-2" />
        My Friends Posts
      </li>

      {/* My Communities */}
      <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
        <FaUsers className="w-5 h-5 mr-2" />
        My Communities
      </li>

      {/* My Wallet */}
      <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer mb-6">
        <FaWallet className="w-5 h-5 mr-2" />
        My Wallet
      </li>

      {/* Border for separation */}
      <div className="border-b" style={{ marginTop: '35px', marginBottom: '30px' }}></div>

      {/* Logout - Visible only if logged in */}
      {isAuthenticated && (
        <li
          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
          onClick={handleLogout}
        >
          <TbLogout2 className="w-5 h-5 mr-2" />
          Logout
        </li>
      )}
    </ul>
  );
};

export default UserSideMenu;

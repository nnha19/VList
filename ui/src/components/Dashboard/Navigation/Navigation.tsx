import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ navLinkStyle }: { navLinkStyle: string }) => {
  return (
    <nav className=" bg-white shadow-sm py-2">
      <div className="flex flex-col justify-between items-center h-full">
        <div className="flex flex-col items-center">
          <div className="px-4 flex items-center mt-4 border-b-2 border-black pb-4">
            <span className="user-avatar">N</span>
            <div className={`${navLinkStyle}`}>
              <h4 className="font-bold text-xl">Nyi Nyi</h4>
              <span className="block">(Joined on Aug 12 2021)</span>
              <span>40 vocabularies</span>
            </div>
          </div>
          <ul className="mt-4">
            <NavLink to="/users">
              <li className="nav-items">
                <i className="fas fa-users"></i>
                <span className={`ml-4 ${navLinkStyle}`}>Users</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/uid/vocabularies">
              <li className="nav-items ">
                <i className="fas fa-columns"></i>
                <span className={`ml-4 ${navLinkStyle}`}>Dashboard</span>
              </li>
            </NavLink>
            <NavLink to="/user/:uid/settings">
              <li className="nav-items">
                <i className="fas fa-cog"></i>
                <span className={`ml-4 ${navLinkStyle}`}>Settings</span>
              </li>
            </NavLink>
            <NavLink to="/user/:uid/noti">
              <li className="nav-items">
                <i className="fas fa-bell"></i>
                <span className={`ml-4 ${navLinkStyle}`}>Notifications</span>
              </li>
            </NavLink>
            <NavLink to="/user/:uid/learning">
              <li className="nav-items">
                <i className="fas fa-book-reader"></i>
                <span className={`ml-4 ${navLinkStyle}`}>Learnings</span>
              </li>
            </NavLink>
          </ul>
          <button className=" text-xl  px-4 rounded-full text-white mt-4 h-12 w-46 bg-red-500 block">
            <i className="fas fa-plus"></i>
            <span className={`ml-4 ${navLinkStyle}`}>Add New</span>
          </button>
        </div>
        <div className="flex px-4 items-center text-xl my-4 cursor-pointer">
          <i className="fas fa-sign-out-alt "></i>
          <p className={`ml-4 ${navLinkStyle}`}>Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

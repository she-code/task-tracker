import React, { useState } from "react";
import UserProfile from "../features/User/UserProfile";
import SidebarData from "./Common/SideBar/SideBarData";

export default function Sidebar() {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className={`${
        toggle ? "w-[5.8rem]" : ""
      }   bg-glass mt-2 p-4 border h-[96%] w-[20rem] rounded-3xl ml-6 transition-all duration-500 border-glass relative `}
    >
      <UserProfile toggle={toggle} />
      <SidebarData toggle={toggle} />
      <div className="absolute top-[7rem] flex justify-center items-center -left-5 w-10 h-10 bg-glass rounded-full cursor-pointer">
        <button onClick={() => setToggle(!toggle)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${
              toggle ? "rotate-100" : ""
            } text-3xl transition-all duration-300`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

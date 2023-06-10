import React, { useState } from "react";
import UserProfile from "../../../features/User/UserProfile";
import SidebarData from "./SideBarData";
import { User } from "../../../types/userTypes";

export default function Sidebar(props: { user: User | null }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className={`${
        toggle ? "w-[5.8rem]" : ""
      }   bg-glass mt-2 p-4 border h-[96%] w-[20rem] rounded-3xl ml-6 transition-all duration-500 border-glass relative `}
    >
      <UserProfile toggle={toggle} user={props.user as User} />
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

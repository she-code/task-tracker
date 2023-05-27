import { ActiveLink } from "raviger";
import React from "react";
import { getAuthToken } from "../../../utils/storageUtils";
import SideBar from "../SideBar/SideBar";

export default function Header() {
  return (
    <div className="flex justify-evenly">
      <SideBar />
      {/* {[
        { page: "Home", url: "/" },

        ...(getAuthToken()
          ? [
              {
                page: "Logout",
                onclick: () => {
                  localStorage.removeItem("token");
                  window.location.reload();
                },
              },
            ]
          : [
              {
                page: "Login",
                url: "/login",
              },
            ]),
      ].map((link) =>
        link.url ? (
          <ActiveLink
            role="link"
            tabIndex={0}
            aria-label={link.page}
            href={link.url}
            key={link.page}
            exactActiveClass="text-green-500"
            className="p-3 shadow-md text-lg mx-2 font-semibold focus:outline-none
        focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50"
          >
            {link.page}
          </ActiveLink>
        ) : (
          <button
            key={link.page}
            tabIndex={0}
            aria-label={link.page}
            onClick={link.onclick}
            className="p-3 shadow-md text-lg mx-2 font-semibold focus:outline-none
        focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50"
          >
            {link.page}
          </button>
        )
      )} */}
    </div>
  );
}

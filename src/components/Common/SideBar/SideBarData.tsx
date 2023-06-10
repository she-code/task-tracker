import React from "react";
import { ActiveLink } from "raviger";
import { useAppDispacth } from "../../../app/hooks";
import { logoutUser } from "../../../features/User/userActions";
import { getAuthToken } from "../../../utils/storageUtils";
import HomeIcon from "../Icons/HomeIcon";
import BoardsIcon from "../Icons/BoardsIcon";
import TasksIcon from "../Icons/TasksIcon";
import LogoutIcon from "../Icons/LogoutIcon";
const SidebarData = (props: { toggle: boolean }) => {
  const { toggle } = props;
  const dispatch = useAppDispacth();
  const data = [
    {
      page: "Dashboard",
      url: "/",
      icon: <HomeIcon />,
    },
    { page: "Boards", url: "/boards", icon: <BoardsIcon /> },
    { page: "Tasks", url: "/tasks", icon: <TasksIcon /> },

    ...(getAuthToken()
      ? [
          {
            page: "Logout",
            icon: <LogoutIcon />,
            onclick: () => {
              dispatch(logoutUser());
              // window.location.reload();
            },
          },
        ]
      : [
          {
            page: "Login",
            url: "/login",
            iocn: <LogoutIcon />,
          },
        ]),
  ];
  return (
    <div className="">
      {data?.map((link) =>
        link.url ? (
          <ActiveLink
            role="link"
            tabIndex={0}
            aria-label={link.page}
            href={link.url}
            key={link.page}
            exactActiveClass="text-green-500"
            className={`
            p-4 text-xl 
            ${
              toggle ? "last:w-[3.6rem]" : "last:w-[14rem]"
            } flex items-center mt-2 rounded-lg cursor-pointer hover:bg-white transition all duration-300 last:absolute left-4 bottom-4`}
          >
            <div className="mr-8 text-[1.7rem] text-brown">{link.icon}</div>
            <div
              className={`${
                toggle ? "opacity-0 delay-200" : ""
              }  text-brown whitespace-pre`}
            >
              {link.page}
            </div>
          </ActiveLink>
        ) : (
          <button
            key={link.page}
            tabIndex={0}
            aria-label={link.page}
            onClick={link.onclick}
            className={`p-3  w-5/6 text-lg mx-2 justify-center focus:outline-none  text-white whitespace-pre
            flex items-center mt-2 rounded-lg cursor-pointer hover:bg-white transition all bg-customPink hover:text-brown
             duration-300 absolute left-4 bottom-4`}
          >
            {toggle ? link.icon : link.page}
          </button>
        )
      )}
    </div>
  );
};

export default SidebarData;

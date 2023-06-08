import React, { useEffect } from "react";
import { useMatch } from "raviger";
// import SideBar from "./Common/SideBar/SideBar";
import { fetchUser } from "../features/User/userActions";
import { useAppDispacth, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Header from "./Common/Header/Header";
import Navbar from "./Common/NavBAr";
import SideBar from "./Common/SideBar";
import Sidebar from "./Sidebar";

import bgImg from "../../src/background.jpg";
export default function AppContainer(props: {
  children: React.ReactNode;
  collapsed: boolean;
  toggleSidebar: () => void;
}) {
  const dispatch = useAppDispacth();
  const user = useAppSelector((state: RootState) => state.users.user);
  const { collapsed, toggleSidebar } = props;
  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const matchBoards = useMatch("/boards");
  const matchTasks = useMatch("/tasks");
  const matchHome = useMatch("/");
  const matchBoard = useMatch("/boards/:id");

  return (
    <div
      className="w-full h-screen object-cover flex  bg-bottom bg-no-repeat bg-cover overflow-x-hidden "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {matchBoards || matchBoard || matchTasks || matchHome ? (
        <Sidebar />
      ) : (
        // <div className="">
        // {/*
        // max-h-max min-h-screen overflow-y-auto  overflow-x-hidden mx-auto
        // flex relative flex-col
        // <Header
        //   toggleSidebar={toggleSidebar}
        //   collapsed={collapsed}
        //   currentUser={user}
        // /> */}
        // {/* <Navbar /> */}
        // {/* <SideBar /> */}

        // {/* <SideBar collapsed={collapsed} /> */}
        // </div>
        <></>
      )}

      <div className={` w-full mx-auto p-6 `}>{props.children}</div>
      {/* </div> */}
    </div>
  );
}

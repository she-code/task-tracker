import React, { useEffect, useState } from "react";
import SideBar from "./Common/SideBar/SideBar";
import { fetchUser } from "../features/User/userActions";
import { useAppDispacth, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Header from "./Common/Header/Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  const dispatch = useAppDispacth();
  const user = useAppSelector((state: RootState) => state.users.user);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log({ user });
  return (
    <div className="max-h-max min-h-screen overflow-y-auto overflow-x-hidden">
      {/* <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl  w-full px-5"> */}
      {/* <Header /> */}
      {window.location.pathname === "/signup" ||
      window.location.pathname === "/login" ? (
        <></>
      ) : (
        <div className="flex relative flex-col ">
          <Header
            toggleSidebar={toggleSidebar}
            collapsed={collapsed}
            currentUser={user}
          />
          <SideBar collapsed={collapsed} />
        </div>
      )}
      <div className=" w-full  p-6 mr-5">{props.children}</div>
      {/* </div> */}
    </div>
  );
}

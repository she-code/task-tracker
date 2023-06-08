import React, { useEffect } from "react";
import { useMatch } from "raviger";
import SideBar from "./Common/SideBar/SideBar";
import { fetchUser } from "../features/User/userActions";
import { useAppDispacth, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Header from "./Common/Header/Header";

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
    <div className="max-h-max min-h-screen overflow-y-auto  overflow-x-hidden mx-auto">
      {!matchBoards || !matchBoard || !matchTasks || !matchHome ? (
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
      <div
        className={` w-full ${!collapsed ? " ml-44 " : "mx-auto"} mx-auto p-6 `}
      >
        {props.children}
      </div>
      {/* </div> */}
    </div>
  );
}

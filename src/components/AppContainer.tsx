import React, { useEffect } from "react";
import { useMatch } from "raviger";
import { fetchUser } from "../features/User/userActions";
import { useAppDispacth, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

import Sidebar from "./Common/Sidebar/Sidebar";

import bgImg from "../../src/background.jpg";
export default function AppContainer(props: {
  children: React.ReactNode;
  collapsed: boolean;
  toggleSidebar: () => void;
}) {
  const dispatch = useAppDispacth();
  const user = useAppSelector((state: RootState) => state.users.user);
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
        <Sidebar user={user} />
      ) : (
        <></>
      )}

      <div className={` w-full mx-auto p-6 `}>{props.children}</div>
    </div>
  );
}

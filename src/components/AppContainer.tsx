import React from "react";
import SideBar from "./Common/SideBar/SideBar";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex  max-h-max min-h-screen bg-gray-100 items-center overflow-y-auto py-5 overflow-x-hidden">
      {/* <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl  w-full px-5"> */}
      {/* <Header /> */}
      <SideBar />
      <div className=" ml-64">{props.children}</div>
      {/* </div> */}
    </div>
  );
}

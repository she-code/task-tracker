import React from "react";
import { datas } from "./data.js";
import { ActiveLink } from "raviger";
const SidebarData = (props: { toggle: boolean }) => {
  const { toggle } = props;
  return (
    <div className="">
      {datas.map((data) => {
        return (
          <ActiveLink
            href={data.url}
            exactActiveClass="bg-white"
            className={`
            p-4 text-xl 
            ${
              toggle ? "last:w-[3.6rem]" : "last:w-[14rem]"
            } flex items-center mt-2 rounded-lg cursor-pointer hover:bg-white transition all duration-300 last:absolute left-4 bottom-4`}
            key={data.id}
          >
            <div className="mr-8 text-[1.7rem] text-brown">{data.icon}</div>
            <div
              className={`${
                toggle ? "opacity-0 delay-200" : ""
              }  text-brown whitespace-pre`}
            >
              {data.text}
            </div>
          </ActiveLink>
        );
      })}
    </div>
  );
};

export default SidebarData;

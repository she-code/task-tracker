import React from "react";

export default function ModalOpenerBtn(props: {
  title: string;
  icon: React.ReactNode;
  onClickCB: () => void;
}) {
  const { title, icon, onClickCB } = props;
  return (
    <button
      className="flex focus:outline-none   px-4 py-4 rounded-md   text-white border-0 w-56
bg-glass  transition duration-300 ease-in-out 
 items-center justify-center shadow-custom hover:shadow-white"
      // style={{ boxShadow: "0px 0px 5px #fff" }}
      onClick={onClickCB}
    >
      {icon}

      <span className="text-xl ml-2">{title}</span>
    </button>
  );
}

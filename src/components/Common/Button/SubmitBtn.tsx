import React from "react";

export default function SubmitBtn(props: { title: string }) {
  return (
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded w-full text-xl">
      {props.title}
    </button>
  );
}

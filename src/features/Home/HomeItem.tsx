import React from "react";

export default function HomeItem(props: { title: string; count: number }) {
  const { title, count } = props;
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 mt-5 flex flex-col justify-center items-center  h-52">
      <h1 className="text-2xl font-semibold text-gray-600">{title}</h1>
      <p className="text-3xl font-bold text-gray-600 mt-2">{count}</p>
    </div>
  );
}

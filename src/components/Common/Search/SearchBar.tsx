import React from "react";

export default function SearchBar(props: {
  value: string;
  onSubmitCB: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChangeCB: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form
      action=""
      onSubmit={(e) => props.onSubmitCB(e)}
      className="relative mx-auto w-max mr-5"
    >
      <input
        type="search"
        aria-label="search"
        value={props.value}
        onChange={(e) => props.handleInputChangeCB(e)}
        className="peer cursor-pointer text-white relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor text-white"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
}

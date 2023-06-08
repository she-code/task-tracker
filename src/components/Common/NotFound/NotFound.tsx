import React from "react";

import notFound from "../../../notFound.svg";
export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen mr-44">
      <img src={notFound} alt="404" className="" />
    </div>
  );
}

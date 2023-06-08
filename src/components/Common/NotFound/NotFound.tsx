import React from "react";

import notFound from "../../src/notFound.svg";
export default function NotFound() {
  return (
    <div>
      not found
      <img src={notFound} alt="404" />
    </div>
  );
}

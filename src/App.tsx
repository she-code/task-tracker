import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App bg-customBackground  m-0">
      <AppRouter collapsed={collapsed} toggleCollapsedCB={toggleSidebar} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

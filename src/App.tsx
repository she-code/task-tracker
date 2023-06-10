import React, { useState } from "react";
import AppRouter from "./router/AppRouter";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App bg-customBackground  m-0">
      <AppRouter collapsed={collapsed} toggleCollapsedCB={toggleSidebar} />
    </div>
  );
}

export default App;

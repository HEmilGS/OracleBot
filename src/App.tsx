import { useState } from "react";
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import CreateTask from "./pages/CreateTask";

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' necesario despues para el header

import "./App.css";

function App() {
  return (
    <div className="flex bg-[#F9F8F8]">
      <SideBar />
      <div className="w-4/5">
        <Header />
        <div className="p-4">
          <CreateTask />
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' necesario despues para el header

import "./App.css";

function App() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-100">
          <Dashboard />
        </main>
        <main className="bg-gray-50 min-h-screen">
          <CreateTask />
        </main>
      </div>
    </div>
  );
}

export default App;

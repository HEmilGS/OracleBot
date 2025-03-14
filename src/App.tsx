
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import FocusMode from "./pages/FocusMode";
import CreateTask from "./pages/CreateTask";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { BrowserRouter as Router, Route } from 'react-router-dom' 


import "./App.css";

import { Routes } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-[#F9F8F8]">
      <Router>
        <SideBar />
        <div className="w-4/5">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/focus" element={<FocusMode />} />
              <Route path="/create" element={<CreateTask />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}
export default App;


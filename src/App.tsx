import React, { useState } from "react";
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import FocusMode from "./pages/FocusMode";
import CreateTask from "./pages/CreateTask";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Task } from './types/Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="flex bg-[#F9F8F8]">
      <Router>
        <SideBar />
        <div className="w-4/5 ml-[18%] mt-[5%]">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks tasks={tasks} />} />
              <Route path="/focus" element={<FocusMode tasks={tasks} />} />
              <Route path="/create" element={<CreateTask addTask={addTask} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
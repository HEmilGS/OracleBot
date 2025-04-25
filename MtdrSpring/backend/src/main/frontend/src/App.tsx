import React, { useState } from "react";
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import FocusMode from "./pages/FocusMode";
import CreateTask from "./pages/CreateTask";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Task } from './types/Task';
import Project from "./pages/project";
import User from "./pages/user";




const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  // Add a default task
  React.useEffect(() => {
    const defaultTask: Task = {
      id: 1, // Unique identifier for the task
      title: "Default Task", // Title of the task
      type: "General", // Type or category of the task
      startDate: "2023-01-01", // Start date of the task
      dueDate: "2023-01-07", // Due date of the task
      description: "This is a default task description.", // Detailed description of the task
      assignee: "John Doe", // Person assigned to the task
      priority: "Medium", // Priority level of the task (e.g., Low, Medium, High)
      state: "Pending", // Current state of the task (e.g., Pending, In Progress, Completed)
    };
    setTasks([defaultTask]);
  }, []);

  return (
    <div className="flex bg-[#F9F8F8]">
      <Router>
        <SideBar />
        <div className="w-4/5 h-full ml-[18%] mt-[5%]">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks tasks={tasks} />} />
              <Route path="/focus" element={<FocusMode tasks={tasks} />} />
              <Route path="/create" element={<CreateTask addTask={addTask} />} />
              <Route path="/project" element={<Project />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
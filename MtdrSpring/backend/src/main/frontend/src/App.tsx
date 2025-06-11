import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de instalar axios
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import FocusMode from "./pages/FocusMode";
import CreateTask from "./pages/CreateTask";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Task } from "./types/Task";
import Project from "./pages/project";
import User from "./pages/user";
import KpiDashboard from "./pages/KpiDashboard";
import EditTasks from "./pages/EditTasks"; // Asegúrate de importar tu componente

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Cargar tareas desde el backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/todo"); // Endpoint para obtener todas las tareas
        setTasks(response.data);
        console.log("Tasks fetched:", response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Agregar una nueva tarea
  const addTask = async (task: Task) => {
    try {
      const response = await axios.post("/api/todo", task); // Endpoint para crear una tarea
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Esta función elimina la tarea del arreglo local
  const handleTaskDeleted = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="flex bg-[#F9F8F8]">
      <Router>
        <SideBar />
        <div className="w-4/5 h-full ml-[18%] mt-[5%]">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/tasks"
                element={
                  <Tasks tasks={tasks} onTaskDeleted={handleTaskDeleted} />
                }
              />
              <Route path="/focus" element={<FocusMode tasks={tasks} />} />
              <Route
                path="/create"
                element={<CreateTask addTask={addTask} />}
              />
              <Route path="/project" element={<Project />} />
              <Route path="/user" element={<User />} />
              <Route path="/kpis" element={<KpiDashboard />} />
              <Route path="/tasks/:id/edit" element={<EditTasks />} />
              {/* <-- Ruta de edición */}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Header from "./Components/header";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import FocusMode from "./pages/FocusMode";
import Project from "./pages/project";
import { Task } from './types/Task';
import User from "./pages/user";

interface UserData {
  idUsuario: number;
  nombre: string;
  correo: string;
  rol: string;
  fechaCreacion: string;
  equipo: {
    id: number;
    nombre: string;
  };
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 2; // Cambia esto según sea necesario
        const response = await axios.get(`/api/usuarios/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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
              <Route path="/user" element={<User userData={userData} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
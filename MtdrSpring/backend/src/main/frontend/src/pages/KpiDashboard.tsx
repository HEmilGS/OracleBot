import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface Task {
  id: number;
  title: string;
  tiempoEstimado: number;
  tiempoReal: number | null; // <-- Cambia a tiempoReal
}

const KpiDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get("/api/todo")
      .then(res => {
        setTasks(res.data);
        console.log("Tareas recibidas:", res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Filtra solo tareas finalizadas y con tiempo real
  const finishedTasks = tasks.filter(
    t => t.tiempoReal !== null && t.tiempoEstimado !== null
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comparación Horas Estimadas vs Horas Reales</h2>
      {finishedTasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas finalizadas con horas reales para mostrar.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={finishedTasks}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tiempoEstimado" fill="#8884d8" name="Horas Estimadas" />
            <Bar dataKey="tiempoReal" fill="#82ca9d" name="Horas Reales" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default KpiDashboard;
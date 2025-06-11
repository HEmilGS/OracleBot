"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown, X } from "lucide-react";
import { Task } from "../types/Task";
import axios from "axios"; // Asegúrate de instalar axios
import { useParams, useNavigate } from "react-router-dom";

// Componentes inline con clases de Tailwind
const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

const Textarea = ({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y ${className}`}
      {...props}
    />
  );
};

const Badge = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default function EditTasks() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [usuarios, setUsuarios] = useState<
    { idUsuario: number; nombre: string }[]
  >([]);

  useEffect(() => {
    axios.get(`/api/todo/${id}`).then((res) => {
      console.log("Tarea recibida:", res.data); // <-- AGREGA ESTA LÍNEA
      setTask(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get("/api/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch(() => setUsuarios([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => {
      if (!prevTask) return prevTask;
      return {
        ...prevTask,
        [name]:
          name === "tiempoEstimado" || name === "tiempoReal"
            ? Number(value)
            : value,
      };
    });
  };

  const priorityMap: Record<string, string> = {
    High: "High",
    Medium: "Medium",
    Low: "Low",
  };

  const handlePriorityChange = (prioridad: string) => {
    setTask((prevTask) => {
      if (!prevTask) return prevTask;
      return {
        ...prevTask,
        prioridad: priorityMap[prioridad] || prioridad,
      };
    });
  };

  // Cambia los botones de status para usar los valores en español
  const handleStatusChange = (status: string) => {
    setTask((prevTask) => {
      if (!prevTask) return prevTask;
      return {
        ...prevTask,
        status,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    try {
      console.log({
        ...task,
        user: { idUsuario: task.user.idUsuario },
        sprint: { id: task.sprint.id },
      });

      await axios.put(`/api/todo/${task.id}`, {
        ...task,
        sprint: { id: task.sprint.id },
      });
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Projects</h1>
        <div className="text-sm text-gray-500">
          <span>Projects</span> / <span>Tasks</span> / <span>Create Tasks</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <Input
              id="task-title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="sprint-id"
              className="block text-sm font-medium text-gray-700"
            >
              Sprint
            </label>
            <Input
              id="sprint-id"
              name="sprint"
              type="number"
              min="1"
              value={task.sprint.id}
              onChange={(e) =>
                setTask((prev) =>
                  prev
                    ? {
                        ...prev,
                        sprint: { ...prev.sprint, id: Number(e.target.value) },
                      }
                    : prev
                )
              }
              placeholder="Número de sprint"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700"
            >
              Task Start Date
            </label>
            <div className="relative">
              <Input
                id="start-date"
                name="creation_ts"
                type="date"
                value={task.creation_ts}
                onChange={handleChange}
                required
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700"
            >
              Task End Date
            </label>
            <div className="relative">
              <Input
                id="end-date"
                name="deadline"
                type="date"
                value={task.deadline}
                onChange={handleChange}
                required
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label
            htmlFor="task-description"
            className="block text-sm font-medium text-gray-700"
          >
            Task Description
          </label>
          <Textarea
            id="task-description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description"
            required
          />
        </div>

        <div className="space-y-2 mb-6">
          <label
            htmlFor="assign-to"
            className="block text-sm font-medium text-gray-700"
          >
            Assign to
          </label>
          <div className="relative">
            <select
              id="assign-to"
              name="user_id"
              value={task.user_id}
              onChange={(e) =>
                setTask((prev) =>
                  prev ? { ...prev, user_id: Number(e.target.value) } : prev
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.idUsuario} value={usuario.idUsuario}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label
              htmlFor="tiempo-estimado"
              className="block text-sm font-medium text-gray-700"
            >
              Tiempo Estimado (horas)
            </label>
            <Input
              id="tiempo-estimado"
              name="tiempoEstimado"
              type="number"
              min="0"
              value={task.tiempoEstimado}
              onChange={handleChange}
              placeholder="Ej: 8"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="tiempo-real"
              className="block text-sm font-medium text-gray-700"
            >
              Tiempo Real (horas)
            </label>
            <Input
              id="tiempo-real"
              name="tiempoReal"
              type="number"
              min="0"
              value={task.tiempoReal}
              onChange={handleChange}
              placeholder="Ej: 10"
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className={
                task.prioridad === "High"
                  ? "bg-red-600 text-white"
                  : "bg-red-50 text-red-700 border border-red-200"
              }
              onClick={() => handlePriorityChange("High")}
            >
              High
            </Button>
            <Button
              type="button"
              className={
                task.prioridad === "Medium"
                  ? "bg-yellow-600 text-white"
                  : "bg-yellow-50 text-yellow-700 border border-yellow-200"
              }
              onClick={() => handlePriorityChange("Medium")}
            >
              Medium
            </Button>
            <Button
              type="button"
              className={
                task.prioridad === "Low"
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 border border-green-200"
              }
              onClick={() => handlePriorityChange("Low")}
            >
              Low
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <label className="block text-sm font-medium text-gray-700">
            Task Assigning
          </label>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={
                task.status === "Pending"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : ""
              }
            >
              {task.status}
              <button
                type="button"
                onClick={() => handleStatusChange("")}
                className="focus:outline-none"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Actualizar
          </Button>
          <Button
            type="button"
            className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
            onClick={() => navigate("/tasks")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { ChevronDown, Lightbulb, Check, Users, Play, Pause, Square } from "lucide-react";
import { Task } from "../types/Task"; // Asegúrate de importar el tipo Task

interface FocusModeContentProps {
  tasks: Task[];
}

export default function FocusModeContent({ tasks: initialTasks }: FocusModeContentProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const priorities = ["All", "High", "Medium", "Low"];
  const dates = ["All", "Today", "This Week", "This Month"];

  // Referencias para detectar clics fuera del dropdown
  const priorityDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);

  return (
    <div className="flex flex-col p-6 w-full max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Focus Mode</h1>
        <div className="flex flex-1 justify-end gap-4">
          {/* Priority dropdown */}
          <div className="relative" ref={priorityDropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
              onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
            >
              <span>{selectedPriority}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {isPriorityDropdownOpen && (
              <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                {priorities.map((priority, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedPriority(priority);
                      setIsPriorityDropdownOpen(false); // Cerrar dropdown después de seleccionar
                    }}
                  >
                    {priority}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date dropdown */}
          <div className="relative" ref={dateDropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              <span>{selectedDate}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                {dates.map((date, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedDate(date);
                      setIsDateDropdownOpen(false); // Cerrar dropdown después de seleccionar
                    }}
                  >
                    {date}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tasks section */}
      <div className="mb-6 flex flex-row justify-between items-start">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        {/* Time spent */}
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full ">
          <div className="flex items-center justify-center w-4 h-4 rounded-full border border-green-500">
            <Check className="h-3 w-3" />
          </div>
          <span className="font-medium">Time spent</span>
          <span className="text-sm font-medium">04:00:00</span>
        </div>
      </div>

      {/* Task list */}
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        selectedPriority={selectedPriority}
        selectedDate={selectedDate}
      />

      {/* Footer */}
      {/* <div className="flex justify-end items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 bg-gray-100">
            <Check className="h-3 w-3" />
          </div>
          <span>{tasks.length} tasks</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 bg-gray-100">
            <Check className="h-3 w-3" />
          </div>
          <span>15 files</span>
        </div>
      </div> */}
    </div>
  );
}

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  selectedPriority: string;
  selectedDate: string;
}

function TaskList({ tasks, setTasks, selectedPriority, selectedDate }: TaskListProps) {
  // Función para filtrar tareas por fecha
  const filterTasksByDate = (task: Task) => {
    const taskDate = new Date(task.creation_ts);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Domingo de esta semana
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Sábado de esta semana
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    switch (selectedDate) {
      case "Today":
        return taskDate.toDateString() === today.toDateString();
      case "This Week":
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      case "This Month":
        return taskDate >= startOfMonth && taskDate <= endOfMonth;
      default:
        return true; // "All"
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch =
      selectedPriority === "All" || task.prioridad === selectedPriority;
    const dateMatch = filterTasksByDate(task);
    const isPending = task.status === "Pendiente"; // Solo pendientes
    return priorityMatch && dateMatch && isPending;
  });

  return (
    <div className="overflow-y-auto ">
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
          <span className="text-2xl font-bold mb-2">¡Estas al día con tus tareas!</span>
          <span className="text-lg">SIN TAREAS PENDIENTES</span>
        </div>
      ) : (
        filteredTasks.map((task, index) => (
          <div
            key={index}
            className="bg-[#f0eeee] rounded-lg shadow-md h-[200px] mb-10 flex flex-col "
          >
            <div className="h-[80px] flex flex-row items-center justify-start bg-white rounded-lg shadow-md">
              <Lightbulb />
              <div className=" flex flex-col items-start justify-start ml-4">
                <span className="font-bold"> {task.title} </span>
                <div>
                  <span className="text-sm text-gray-500">#{task.id} </span>
                  <span className="ml-4 text-sm  bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center mb-4 ml-auto mr-5 gap-2">
                <span className="text-md bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">
                  {task.deadline}
                </span>
                <span
                  className={`text-md w-auto px-2 rounded-xl ml-4 ${
                    task.prioridad === "High"
                      ? "bg-red-500/60 text-white"
                      : task.prioridad === "Medium"
                        ? "bg-yellow-500/60 text-white"
                        : "bg-green-500 text-white"
                  }`}
                >
                  {task.prioridad}
                </span>
                {/* Mueve aquí el timer */}
                {task.status !== "Completada" && (
                  <TaskTimer
                    taskId={task.id}
                    onComplete={(tiempoReal) => {
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id
                            ? { ...t, status: "Completada", tiempoReal: tiempoReal.toString() }
                            : t
                        )
                      );
                    }}
                  />
                )}
                <Users className="ml-4" />
              </div>
            </div>
            <div className="p-3">
              {/* Descripción de la tarea */}
              <span className="text-gray-700">{task.description || "Sin descripción"}</span>
              {/* Aquí puedes mostrar el tiempo real si la tarea está completada */}
              {task.status === "Completada" && (
                <span className="text-green-600 font-semibold block mt-2">
                  Tiempo real: {task.tiempoReal ? `${task.tiempoReal} h` : "—"}
                </span>
              )}
            </div>
          </div>
        )))}
    </div>
  );
}

// Componente Timer para cada tarea
function TaskTimer({ taskId, onComplete }: { taskId: number, onComplete: (tiempoReal: number) => void }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // en segundos
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Iniciar el timer
  const handlePlay = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
  };

  // Pausar el timer
  const handlePause = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Detener y guardar
  const handleStop = async () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Redondeo: menos de 30 min = 0h, 30 min o más = redondea a la hora más cercana
    let tiempoReal = 0;
    if (elapsed >= 1800) {
      tiempoReal = Math.round(elapsed / 3600);
      // Si pasaron más de 30 min pero menos de 1h, cuenta como 1h
      if (tiempoReal === 0) tiempoReal = 1;
    }

    try {
      await axios.put(`/api/todo/${taskId}/finalizar?TiempoReal=${tiempoReal}`);
      onComplete(tiempoReal);
    } catch (err) {
      console.error("Error al finalizar la tarea:", err);
      // Aquí puedes mostrar un mensaje de error más amigable al usuario si lo deseas
      // Por ejemplo, podrías usar un componente de notificación en vez de alert
      alert("Error al finalizar la tarea");
      return;
    }
  };

  // Formatear tiempo
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-lg">{formatTime(elapsed)}</span>
      <button
        onClick={handlePlay}
        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
        title="Iniciar"
      >
        <Play className="w-5 h-5" />
      </button>
      <button
        onClick={handlePause}
        className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
        title="Pausar"
      >
        <Pause className="w-5 h-5" />
      </button>
      <button
        onClick={handleStop}
        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        title="Finalizar"
      >
        <Square className="w-5 h-5" />
      </button>
    </div>
  );
}

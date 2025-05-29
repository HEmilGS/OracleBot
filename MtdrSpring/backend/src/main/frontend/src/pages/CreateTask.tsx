"use client"

import React, { useState } from "react"
import { Calendar, ChevronDown, X } from "lucide-react"
import { Task } from "../types/Task"
import axios from "axios"; // Asegúrate de instalar axios

// Componentes inline con clases de Tailwind
const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type={type} className={`px-4 py-2 rounded-md font-medium ${className}`} {...props}>
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}

const Textarea = ({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y ${className}`}
      {...props}
    />
  )
}

const Badge = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface CreateTaskProps {
  addTask: (task: Task) => void;
}

export default function CreateTask({ addTask }: CreateTaskProps) {
  const [task, setTask] = useState<Task>({
    id: 0,
    title: '',
    type: '',
    creation_ts: '',
    deadline: '',
    description: '',
    assignee: '',
    priority: 'Medium',
    status: 'Pendiente',
    project_id: 2,
    user: { idUsuario: 1 }, // <--
    sprint: { id: 5 },     // Valor por defecto
    tiempoEstimado: '' // Valor por defecto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handlePriorityChange = (priority: string) => {
    setTask(prevTask => ({
      ...prevTask,
      priority
    }));
  };

  // Cambia los botones de status para usar los valores en español
  const handleStatusChange = (status: string) => {
    setTask(prevTask => ({
      ...prevTask,
      status
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/todo", task); // Llamada al backend
      addTask(response.data); // Actualizar el estado global
      setTask({
        id: 0,
        title: '',
        type: '',
        creation_ts: '',
        deadline: '',
        description: '',
        assignee: '',
        priority: 'Medium',
        status: 'Pendiente', // Restablecer valor por defecto en español
        project_id: 2, // Restablecer valor por defecto
        user: {idUsuario: 1},    // Restablecer valor por defecto
        sprint: { id: 5 },      // Restablecer valor por defecto
        tiempoEstimado: '' // Restablecer valor por defecto
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Projects</h1>
        <div className="text-sm text-gray-500">
          <span>Projects</span> / <span>Task</span> / <span>Create Tasks</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="task-type" className="block text-sm font-medium text-gray-700">
              Task Type
            </label>
            <Input
              id="task-type"
              name="type"
              value={task.type}
              onChange={handleChange}
              placeholder="Select task type"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="assign-to" className="block text-sm font-medium text-gray-700">
            Assign to
          </label>
          <div className="relative">
            <Input
              id="assign-to"
              name="assignee"
              value={task.assignee}
              onChange={handleChange}
              className="pr-10"
              required
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              className={task.priority === "High" ? "bg-red-600 text-white" : "bg-red-50 text-red-700 border border-red-200"}
              onClick={() => handlePriorityChange("High")}
            >
              High
            </Button>
            <Button
              type="button"
              className={task.priority === "Medium" ? "bg-yellow-600 text-white" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}
              onClick={() => handlePriorityChange("Medium")}
            >
              Medium
            </Button>
            <Button
              type="button"
              className={task.priority === "Low" ? "bg-green-600 text-white" : "bg-green-50 text-green-700 border border-green-200"}
              onClick={() => handlePriorityChange("Low")}
            >
              Low
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <label className="block text-sm font-medium text-gray-700">Task Assigning</label>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={task.status === "Pending" ? "bg-red-50 text-red-700 border border-red-200" : ""}
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
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
            Create
          </Button>
          <Button type="button" className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100">
            Delete
          </Button>
        </div>
      </form>
    </div>
  )
}
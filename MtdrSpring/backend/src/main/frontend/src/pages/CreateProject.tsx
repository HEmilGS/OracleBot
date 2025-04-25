"use client"

import React, { useState } from "react"
import { Calendar, ChevronDown, X } from "lucide-react"
import { Task } from "../types/Task"

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

export default function CreateProject({ addTask }: CreateTaskProps) {
  const [task, setTask] = useState<Task>({
    id: 0,
    title: 'Make an Automatic Payment System that enable the design',
    type: 'task type',
    startDate: '',
    dueDate: '',
    description: 'task desc',
    assignee: 'Emil', // Valor por defecto
    priority: 'High',
    state: 'Pending'
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

  const handleStatusChange = (state: string) => {
    setTask(prevTask => ({
      ...prevTask,
      state
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ ...task, id: Date.now() }); // Usamos el timestamp como ID único
    setTask({
      id: 0,
      title: '',
      type: '',
      startDate: '',
      dueDate: '',
      description: '',
      assignee: '',
      priority: 'High',
      state: 'Pending'
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Projects</h1>
        <div className="text-sm text-gray-500">
          <span>Projects</span> / <span>Tasks</span> / <span>Create Tasks</span>
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
                name="startDate"
                type="date"
                value={task.startDate}
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
                name="dueDate"
                type="date"
                value={task.dueDate}
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
              className={task.state === "Pending" ? "bg-red-50 text-red-700 border border-red-200" : ""}
            >
              {task.state}
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
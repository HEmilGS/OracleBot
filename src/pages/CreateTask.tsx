"use client";

import type React from "react";
import { useState } from "react";
import { Calendar, ChevronDown, X } from "lucide-react";

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

export default function CreateTask() {
  const [priority, setPriority] = useState<string>("High");
  const [status, setStatus] = useState<string>("Pending");

  const handleRemovePriority = () => {
    setPriority("");
  };

  const handleRemoveStatus = () => {
    setStatus("");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Projects</h1>
        <div className="text-sm text-gray-500">
          <span>Projects</span> / <span>Tasks</span> / <span>Create Tasks</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <Input id="task-title" placeholder="Enter task title" />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="task-type"
              className="block text-sm font-medium text-gray-700"
            >
              Task Type
            </label>
            <Input id="task-type" placeholder="Select task type" />
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
                placeholder="DD/MM/YYYY"
                className="pr-10"
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
              <Input id="end-date" placeholder="DD/MM/YYYY" className="pr-10" />
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
            placeholder="Enter task description"
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
            <Input
              id="assign-to"
              value="Yash Ghori"
              className="pr-10"
              readOnly
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {priority && (
              <Badge
                className={
                  priority === "High"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : ""
                }
              >
                {priority}
                <button
                  onClick={handleRemovePriority}
                  className="focus:outline-none"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <label className="block text-sm font-medium text-gray-700">
            Task Assigning
          </label>
          <div className="flex flex-wrap gap-2">
            {status && (
              <Badge
                className={
                  status === "Pending"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : ""
                }
              >
                {status}
                <button
                  onClick={handleRemoveStatus}
                  className="focus:outline-none"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            className="bg-[#a63b2a] hover:bg-[#E76451] text-white"
          >
            Create
          </Button>
          <Button
            type="button"
            className="bg-[#F2C9C3] text-[#a63b2a] border border-red-200 hover:bg-red-100"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

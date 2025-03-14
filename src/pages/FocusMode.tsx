"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, MessageSquare, Lightbulb, Check, Clock, User } from "lucide-react"

export default function FocusModeContent() {
  const [focusModeEnabled, setFocusModeEnabled] = useState(true)
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedDate, setSelectedDate] = useState("All")
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false)
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)

  const priorities = ["All", "High", "Medium", "Low"]
  const dates = ["All", "Today", "This Week", "This Month"]

  // Referencias para detectar clics fuera del dropdown
  const priorityDropdownRef = useRef(null)
  const dateDropdownRef = useRef(null)

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
        setIsPriorityDropdownOpen(false)
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col p-6 w-full max-w-5xl mx-auto">
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
                      setSelectedPriority(priority)
                      setIsPriorityDropdownOpen(false) // Cerrar dropdown después de seleccionar
                    }}
                  >
                    {priority}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date dropdown */}
          {/* <div className="relative" ref={dateDropdownRef}>
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
                      setSelectedDate(date)
                      setIsDateDropdownOpen(false) // Cerrar dropdown después de seleccionar
                    }}
                  >
                    {date}
                  </div>
                ))}
              </div>
            )}
          </div> */}
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
      <TaskList selectedPriority={selectedPriority} selectedDate={selectedDate} />

      {/* Footer */}
      <div className="flex justify-end items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 bg-gray-100">
            <Check className="h-3 w-3" />
          </div>
          <span>50 tasks</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 bg-gray-100">
            <Check className="h-3 w-3" />
          </div>
          <span>15 files</span>
        </div>
      </div>
    </div>
  )
}

function TaskList({ selectedPriority, selectedDate }) {
  const tasks = [
    {
      id: "40235",
      title: "Make an Automatic Payment System that enable the design",
      assignee: "Yash Ghori",
      openedDays: 11,
      timeSpent: "00:30:00",
      priority: "High",
      status: "Pending",
      startDate: "2025-06-02", // Formato YYYY-MM-DD para facilitar la comparación
      endDate: "2025-06-15",
      description:
        "Revisar y actualizar la lista de tareas pendientes para asegurar que todas estén asignadas y con fechas límite claras.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "40233",
      title: "Make an Automatic Payment System that enable the design",
      assignee: "Yash Ghori",
      openedDays: 11,
      timeSpent: "00:30:00",
      priority: "Medium",
      status: "Canceled",
      completedStatus: "Completed",
      startDate: "2025-06-02",
      endDate: "2025-06-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "40235",
      title: "Make an Automatic Payment System that enable the design",
      assignee: "Yash Ghori",
      openedDays: 10,
      timeSpent: "00:30:00",
      priority: "Low",
      status: "Canceled",
      completedStatus: "Completed",
      startDate: "2025-06-02",
      endDate: "2025-06-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Función para filtrar tareas por fecha
  const filterTasksByDate = (task) => {
    const taskDate = new Date(task.startDate)
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Domingo de esta semana
    const endOfWeek = new Date(today)
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())) // Sábado de esta semana
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    switch (selectedDate) {
      case "Today":
        return taskDate.toDateString() === today.toDateString()
      case "This Week":
        return taskDate >= startOfWeek && taskDate <= endOfWeek
      case "This Month":
        return taskDate >= startOfMonth && taskDate <= endOfMonth
      default:
        return true // "All"
    }
  }

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = selectedPriority === "All" || task.priority === selectedPriority
    const dateMatch = filterTasksByDate(task)
    return priorityMatch && dateMatch
  })

  return (
    <div className="space-y-4 overflow-y-auto max-h-120">        
      {filteredTasks.map((task, index) => (
        <div key={index} className="bg-white border rounded-lg p-4 shadow-sm ">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Lightbulb className="h-5 w-5 text-amber-500" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    #{task.id} · Opened {task.openedDays} days ago by {task.assignee}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    <span className="text-sm font-medium">{task.timeSpent}</span>
                  </div>

                  <div className="h-8 w-8 rounded-full overflow-hidden">
                  <User/>
                  </div>

                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>  

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Priority:</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-red-50 text-red-600 rounded border border-red-200">
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">State:</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-orange-50 text-orange-600 rounded border border-orange-200">
                  {task.status}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Task Start Date:</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 rounded border">
                  {task.startDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Task End Date:</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 rounded border">{task.endDate}</span>
              </div>
            </div>

            <div className="col-span-2 mt-2">
              <span className="text-sm font-medium">Description:</span>
              <p className="text-sm mt-1 p-2 bg-red-50 text-red-600 rounded-md border border-red-200">
                {task.description}
              </p>
            </div>
          </div>        
        </div>
      ))}
    </div>
  )
}
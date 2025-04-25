"use client"

import { useState, useRef } from "react"
import { ChevronDown, Lightbulb, Check, Users } from "lucide-react"
import { Task } from "../types/Task" // Asegúrate de importar el tipo Task

interface FocusModeContentProps {
  tasks: Task[];
}

export default function FocusModeContent({ tasks }: FocusModeContentProps) {
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedDate, setSelectedDate] = useState("All")
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false)
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)

  const priorities = ["All", "High", "Medium", "Low"]
  const dates = ["All", "Today", "This Week", "This Month"]

  // Referencias para detectar clics fuera del dropdown
  const priorityDropdownRef = useRef(null)
  const dateDropdownRef = useRef(null)

  // Cerrar dropdowns al hacer clic fuer

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
                      setSelectedDate(date)
                      setIsDateDropdownOpen(false) // Cerrar dropdown después de seleccionar
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
      <TaskList tasks={tasks} selectedPriority={selectedPriority} selectedDate={selectedDate} />

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
  )
}

interface TaskListProps {
  tasks: Task[];
  selectedPriority: string;
  selectedDate: string;
}

function TaskList({ tasks, selectedPriority, selectedDate }: TaskListProps) {
  // Función para filtrar tareas por fecha
  const filterTasksByDate = (task: Task) => {
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
    // max-h-120       
    <div className="overflow-y-auto ">  
      {filteredTasks.map((task, index) => (
        <div key={index} className="bg-[#f0eeee] rounded-lg shadow-md h-[200px] mb-10 flex flex-col ">
          <div className='h-[80px] flex flex-row items-center justify-start bg-white rounded-lg shadow-md'>
          <Lightbulb/>
            <div className=' flex flex-col items-start justify-start ml-4'>
                <span className='font-bold'> {task.title} </span>
                <div >
                <span className="text-sm text-gray-500">#{task.id} </span>
                <span className='ml-4 text-sm  bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]'>{task.state}</span>
                </div>
            </div>
            <div className='flex flex-row items-center mb-4 ml-auto mr-5'>
                <span className="text-md bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">{task.dueDate}</span>
                <span 
                    className={`text-md w-auto px-2 rounded-xl ml-4 ${
                        task.priority === 'High' ? 'bg-red-500/60 text-white' :
                        task.priority === 'Medium' ? 'bg-yellow-500/60 text-white' :
                        'bg-green-500 text-white'
                    }`}
                >
                    {task.priority}
                </span>
                <Users className='ml-10' />

            </div>


          </div>
          <div className="p-3">
            content
          </div>
        </div>
      ))}
    </div>
  )
}
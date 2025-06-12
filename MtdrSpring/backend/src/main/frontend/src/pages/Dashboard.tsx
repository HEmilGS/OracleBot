"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Check, Circle } from "lucide-react";
import TareasDevSprint from "../Components/TareasDevSprint";

interface Task {
  ID: number;
  title: string;
  status: string;
  prioridad: string;
  // agrega otros campos si los necesitas
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    completadas: 0,
    enProgreso: 0,
    pendientes: 0,
    total: 0,
  });
  const [activeTab] = useState("all");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [pendientes, enProgreso, completadas] = await Promise.all([
          axios.get("/api/todo/status/Pendiente"),
          axios.get("/api/todo/status/EnProgreso"),
          axios.get("/api/todo/status/Completada"),
        ]);

        setMetrics({
          completadas: completadas.data.length,
          enProgreso: enProgreso.data.length,
          pendientes: pendientes.data.length,
          total:
            pendientes.data.length +
            enProgreso.data.length +
            completadas.data.length,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/todo");
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchMetrics();
    fetchTasks();
  }, []);

  // Filtrado de tareas según el tab activo
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "Todas") return true;
    if (activeTab === "Urgentes") return task.prioridad === "Alta";
    if (activeTab === "Pendientes") return task.status === "Pendiente";
    return true;
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Welcome Message */}
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard color="bg-amber-100" title="Completada" value={metrics.completadas} />
        <MetricCard color="bg-orange-100" title="Progreso" value={metrics.enProgreso} />
        <MetricCard color="bg-red-100" title="Pendiente" value={metrics.pendientes} />
        <MetricCard color="bg-blue-100" title="Total" value={metrics.total} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          {/* Chart */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-base font-bold uppercase">Tareas por Sprint y Usuario</h3>
            </div>
            <TareasDevSprint />
          </div>

          {/* Tasks */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="pb-2 text-base font-normal text-gray-500">
              Tareas
            </h3>
            <div>
              {filteredTasks.length === 0 ? (
                <div className="text-gray-400 text-center py-4">No hay tareas.</div>
              ) : (
                <>
                  {filteredTasks.map((task) => {
                    let statusColor = "text-green-500";
                    if (task.status === "Completada") {
                      statusColor = "text-red-500";
                    } else if (task.status === "EnProgreso") {
                      statusColor = "text-orange-500";
                    } else if (task.status === "Pendiente") {
                      statusColor = "text-blue-500";
                    }
                    return (
                      <TaskItem
                        key={task.ID}
                        title={task.title}
                        status={task.status}
                        completed={task.status === "Completada"}
                        statusColor={statusColor}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Calendar */}
            <div className="overflow-hidden rounded-lg bg-[#2D2A2A] text-white shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold">
              {new Date().toLocaleString("default", { month: "long" }).toUpperCase()}{" "}
              <span className="text-lg">{new Date().getFullYear()}</span>
              </h2>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, index) => (
                <div
                key={index}
                className={`font-medium ${
                  day === "SAT" || day === "SUN" ? "text-red-400" : ""
                }`}
                >
                {day}
                </div>
              ))}

              {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() - 1 }, (_, i) => (
                <div key={`empty-${i}`} className="py-1.5 text-gray-500"></div>
              ))}
              {Array.from(
                { length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() },
                (_, i) => (
                <div
                  key={`day-${i + 1}`}
                  className={`py-1.5 ${
                  i + 1 === new Date().getDate() ? "rounded-full bg-red-500" : ""
                  }`}
                >
                  {i + 1}
                </div>
                )
              )}
              </div>
            </div>
            </div>

          {/* Team Members */}
          <div className="rounded-lg bg-[#2D2A2A] p-6 text-white shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">TEAM MEMBER</h2>
            <div className="space-y-3">
              <TeamMemberItem
                name="John Doe"
                description="Lorem ipsum dolor sit amet conactor"
              />
              <TeamMemberItem name="John Doe" description="Lorem ipsum" />
              <TeamMemberItem name="John Doe" description="Lorem ipsum" />
            </div>
          </div>


          {/* Meetings */}
          <div className="rounded-lg bg-[#2D2A2A] p-6 text-white shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">MEETINGS</h2>
            <div className="space-y-3">
              <MeetingItem
                name="MEETING WITH JOHN DOE"
                time="9:00 - 10:00 PDT"
              />
              <MeetingItem
                name="MEETING WITH JOHN DOE"
                time="11:00 - 12:00 PDT"
              />
              <MeetingItem
                name="MEETING WITH JOHN DOE"
                time="14:00 - 14:45 PDT"
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  color: string;
  title: string;
  value: number;
}

function MetricCard({ color, title, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <div className={`mb-2 h-16 w-16 rounded-full ${color}`} />
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-medium">{value}</p>
      </div>
    </div>
  );
}

interface TaskItemProps {
  title: string;
  status: string;
  completed: boolean;
  statusColor?: string;
}

function TaskItem({
  title,
  status,
  completed,
  statusColor = "text-green-500",
}: TaskItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
        {completed ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
            <Check className="h-4 w-4" />
          </div>
        ) : (
          <Circle className="h-6 w-6 text-gray-400" />
        )}
        <span>{title}</span>
      </div>
      <span className={statusColor}>{status}</span>
    </div>
  );
}

function MeetingItem({ name, time }: { name: string; time: string }) {
  return (
    <div className="flex overflow-hidden rounded-md bg-white text-black">
      <div className="w-2 bg-orange-500" />
      <div className="flex-1 p-3">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">{time}</p>
        <p className="mt-1 text-xs text-gray-500">ON ZOOM</p>
      </div>
    </div>
  );
}

function TeamMemberItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-white p-3 text-black">
      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

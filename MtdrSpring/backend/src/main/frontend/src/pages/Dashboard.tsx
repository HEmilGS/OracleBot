"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Check, ChevronDown, Circle } from "lucide-react";

// Datos para el gráfico
const chartData = [
  { name: "Jan", blue: -10, pink: -20, purple: -15 },
  { name: "Feb", blue: 10, pink: -10, purple: 30 },
  { name: "Mar", blue: 30, pink: 0, purple: 10 },
  { name: "Apr", blue: 20, pink: 40, purple: -20 },
  { name: "Mai", blue: 10, pink: 20, purple: -30 },
  { name: "Ju", blue: 15, pink: -10, purple: 30 },
];



export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    completadas: 0,
    enProgreso: 0,
    pendientes: 0,
    total: 0,
  });
  const [activeTab, setActiveTab] = useState("all");

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

    fetchMetrics();
  }, []);

  


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
              <h3 className="text-base font-bold uppercase">Chart Title</h3>
              <button className="flex h-8 items-center gap-1 rounded-md px-2 text-sm font-medium hover:bg-gray-100">
                This Week
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line
                    type="monotone"
                    dataKey="blue"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="pink"
                    stroke="#EC4899"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="purple"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                <span className="text-sm">Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">Content</span>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="pb-2 text-base font-normal text-gray-500">
              pending tasks
            </h3>
            <div className="w-full">
              <div className="mb-4 flex gap-4 border-b">
                <button
                  className={`h-9 px-4 py-2 ${
                    activeTab === "all" ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All{" "}
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    10
                  </span>
                </button>
                <button
                  className={`h-9 px-4 py-2 ${
                    activeTab === "important"
                      ? "border-b-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("important")}
                >
                  Important
                </button>
                <button
                  className={`h-9 px-4 py-2 ${
                    activeTab === "notes" ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("notes")}
                >
                  Notes{" "}
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    06
                  </span>
                </button>
                <button
                  className={`h-9 px-4 py-2 ${
                    activeTab === "links" ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("links")}
                >
                  Links{" "}
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    10
                  </span>
                </button>
              </div>
              <div className="space-y-4">
                {activeTab === "all" && (
                  <>
                    <TaskItem
                      title="Create a user flow of social application design"
                      status="Approved"
                      completed={true}
                    />
                    <TaskItem
                      title="Create a user flow of social application design"
                      status="In review"
                      completed={true}
                      statusColor="text-red-500"
                    />
                    <TaskItem
                      title="Landing page design for Fintech project of singapore"
                      status="In review"
                      completed={true}
                      statusColor="text-red-500"
                    />
                    <TaskItem
                      title="Interactive prototype for app screens of deltamine project"
                      status="On going"
                      completed={false}
                    />
                    <TaskItem
                      title="Interactive prototype for app screens of deltamine project"
                      status="Approved"
                      completed={true}
                    />
                  </>
                )}
                {activeTab === "important" && (
                  <TaskItem
                    title="Create a user flow of social application design"
                    status="Approved"
                    completed={true}
                  />
                )}
                {activeTab === "notes" && (
                  <TaskItem
                    title="Landing page design for Fintech project of singapore"
                    status="In review"
                    completed={true}
                    statusColor="text-red-500"
                  />
                )}
                {activeTab === "links" && (
                  <TaskItem
                    title="Interactive prototype for app screens of deltamine project"
                    status="On going"
                    completed={false}
                  />
                )}
              </div>
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
                  key={i}
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

"use client";

import { useState } from "react";
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
  { name: "Jun", blue: 15, pink: -10, purple: 30 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard color="bg-amber-100" title="Overdue" value="5" />
        <MetricCard color="bg-orange-100" title="Overdue" value="5" />
        <MetricCard color="bg-red-100" title="Overdue" value="5" />
        <MetricCard color="bg-blue-100" title="Overdue" value="5" />
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
                JANUARY <span className="text-lg">2023</span>
              </h2>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
                <div className="font-medium">MON</div>
                <div className="font-medium">TUE</div>
                <div className="font-medium">WED</div>
                <div className="font-medium">THU</div>
                <div className="font-medium">FRI</div>
                <div className="font-medium text-red-400">SAT</div>
                <div className="font-medium text-red-400">SUN</div>

                <div className="py-1.5 text-gray-500">26</div>
                <div className="py-1.5 text-gray-500">27</div>
                <div className="py-1.5 text-gray-500">28</div>
                <div className="py-1.5 text-gray-500">29</div>
                <div className="py-1.5 text-gray-500">30</div>
                <div className="py-1.5 text-red-400">31</div>
                <div className="py-1.5 text-red-400">1</div>

                <div className="py-1.5">2</div>
                <div className="py-1.5">3</div>
                <div className="py-1.5">4</div>
                <div className="py-1.5">5</div>
                <div className="py-1.5">6</div>
                <div className="py-1.5 text-red-400">7</div>
                <div className="py-1.5 text-red-400">8</div>

                <div className="py-1.5">9</div>
                <div className="py-1.5">10</div>
                <div className="py-1.5">11</div>
                <div className="py-1.5">12</div>
                <div className="py-1.5">13</div>
                <div className="py-1.5 text-red-400">14</div>
                <div className="py-1.5 text-red-400">15</div>

                <div className="py-1.5">16</div>
                <div className="rounded-full bg-red-500 py-1.5">17</div>
                <div className="py-1.5">18</div>
                <div className="py-1.5">19</div>
                <div className="py-1.5">20</div>
                <div className="py-1.5 text-red-400">21</div>
                <div className="py-1.5 text-red-400">22</div>

                <div className="py-1.5">23</div>
                <div className="py-1.5">24</div>
                <div className="py-1.5">25</div>
                <div className="py-1.5">26</div>
                <div className="py-1.5">27</div>
                <div className="py-1.5 text-red-400">28</div>
                <div className="py-1.5 text-red-400">29</div>

                <div className="py-1.5">30</div>
                <div className="py-1.5">31</div>
              </div>
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
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  color: string;
  title: string;
  value: string;
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

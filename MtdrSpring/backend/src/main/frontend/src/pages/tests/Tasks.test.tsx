import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Tasks from "../Tasks";
import { Task } from "../../types/Task";
import '@testing-library/jest-dom';

import axios from "axios";

const mockedAxios = axios as jest.Mocked<typeof axios>;


jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("/api/todo/1/username")) {
      return Promise.resolve({ data: "User 1" });
    }
    if (url.includes("/api/todo/2/username")) {
      return Promise.resolve({ data: "User 2" });
    }
    if (url.includes("/api/todo/user/1")) {
      return Promise.resolve({
        data: [
          {
            id: 1,
            title: "Task 1",
            type: "Development",
            creation_ts: "2025-04-01T00:00:00Z",
            deadline: "2025-04-30T00:00:00Z",
            description: "Description for Task 1",
            assignee: "User 10",
            priority: "High",
            status: "Pending",
            project_id: 1,
            user_id: 10,
            sprint: { id: 1 },
            tiempoEstimado: "5h",
          },
        ],
      });
    }
    if (url.includes("/api/todo/user/2")) {
      return Promise.resolve({
        data: [
          {
            id: 2,
            title: "Task 2",
            type: "Testing",
            creation_ts: "2025-04-05T00:00:00Z",
            deadline: "2025-05-01T00:00:00Z",
            description: "Description for Task 2",
            assignee: "User 2",
            priority: "Medium",
            status: "In Progress",
            project_id: 1,
            user_id: 2,
            sprint: { id: 1 },
            tiempoEstimado: "3h",
          },
        ],
      });
    }
    return Promise.reject(new Error("Not Found"));
  }),
put: jest.fn(), 
}));




const mockTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    type: "Development",
    creation_ts: "2025-04-01T00:00:00Z",
    deadline: "2025-04-30T00:00:00Z",
    description: "Description for Task 1",
    assignee: "User 10",
    priority: "High",
    status: "Pending",
    project_id: 1,
    user_id: 10,
    sprint: { id: 1 },
    tiempoEstimado: "5h",
  },
  {
    id: 2,
    title: "Task 2",
    type: "Testing",
    creation_ts: "2025-04-05T00:00:00Z",
    deadline: "2025-05-01T00:00:00Z",
    description: "Description for Task 2",
    assignee: "User 2",
    priority: "Medium",
    status: "In Progress",
    project_id: 1,
    user_id: 2,
    sprint: { id: 1 },
    tiempoEstimado: "3h",
  },
];

test("reders task per user", async () => {
  render(
    <MemoryRouter>
      <Tasks tasks={mockTasks} />
    </MemoryRouter>
  );

  
  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();

  
  await waitFor(() => {
    expect(screen.getByText("Assigned to: User 1")).toBeInTheDocument();
    expect(screen.getByText("Assigned to: User 2")).toBeInTheDocument();
  });

  
  expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });



test("updates task status via API", async () => {
  
  mockedAxios.get.mockResolvedValueOnce({ data: "User 1" });

  
  mockedAxios.put.mockResolvedValueOnce({
    data: { ...mockTasks[0], status: "In progress" },
  });

  render(
    <MemoryRouter>
      <Tasks tasks={mockTasks} />
    </MemoryRouter>
  );

  
  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Assigned to: User 1")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  
  const statusButton = screen.getByText("Pending");
  fireEvent.click(statusButton);

  
  await waitFor(() => {
    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/api/todo/1/status",
      expect.objectContaining({ status: "In progress" })
    );
    expect(screen.getByText((content) => content.toLowerCase() === "in progress")
  ).toBeInTheDocument();
  });
});

test("updates estimated hours via API", async () => {
  
  mockedAxios.get.mockResolvedValueOnce({ data: "User 1" });

  
  mockedAxios.put.mockResolvedValueOnce({
    data: { ...mockTasks[0], tiempoEstimado: "8h" },
  });

  render(
    <MemoryRouter>
      <Tasks tasks={mockTasks} />
    </MemoryRouter>
  );

  
  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Assigned to: User 1")).toBeInTheDocument();
    expect(screen.getByText("Tiempo estimado: 5h")).toBeInTheDocument(); 
  });

  
  const taskContainer = screen.getByText("Task 1").closest("li");
  expect(taskContainer).not.toBeNull();

  
  const editButton = within(taskContainer!).getByText("Edit");
  fireEvent.click(editButton);

  
  const input = within(taskContainer!).getByDisplayValue("5h");
  fireEvent.change(input, { target: { value: "8h" } });

  
  const saveButton = within(taskContainer!).getByText("Save");
  fireEvent.click(saveButton);

  
  await waitFor(() => {
    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/api/todo/1/estimated-hours",
      expect.objectContaining({ tiempoEstimado: "8h" })
    );
    expect(screen.getByText("Tiempo estimado: 8h")).toBeInTheDocument(); 
  });
});
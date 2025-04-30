import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import Tasks from "../Tasks";
import { Task } from "../../types/Task";
import '@testing-library/jest-dom';

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    type: "Development",
    creation_ts: "2025-04-01T00:00:00Z",
    deadline: "2025-04-30T00:00:00Z",
    description: "Description for Task 1",
    assignee: "User 1",
    priority: "High",
    status: "Pending",
    project_id: 1,
    user_id: 1,
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

const server = setupServer(
  http.get("/api/todo", () => {
    return HttpResponse.json(mockTasks);
  }),
  http.get("/api/todo/:taskId/username", ({ params }) => {
    const { taskId } = params;
    const user = mockTasks.find((task) => task.id === Number(taskId))?.assignee || "Unassigned";
    return HttpResponse.json(user);
  }),
   http.put("/api/todo/:taskId", async (req, res, ctx) => {
    const { taskId } = req.params;
    const updatedTask = await req.json();
    const taskIndex = mockTasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updatedTask };
      return res(ctx.json(mockTasks[taskIndex]));
    }
    return res(ctx.status(404));
  }),

  http.put("/api/todo/:taskId/status", async (req, res, ctx) => {
    const { taskId } = req.params;
    const { status } = await req.json();
    const taskIndex = mockTasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex !== -1) {
      mockTasks[taskIndex].status = status;
      return res(ctx.json(mockTasks[taskIndex]));
    }
    return res(ctx.status(404));
  }),
  http.get("/api/todo/sprint/1/status/Completada", (req, res, ctx) => {
    return res(ctx.json(mockTasks));
  }),
  http.get("/api/todo/:taskId/username", ({ params }) => {
    const { taskId } = params;
    const user = mockTasks.find((task) => task.id === Number(taskId))?.assignee || "Unassigned";
    return HttpResponse.json(user);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("updates the task title and reflects the change", async () => {
  render(<Tasks tasks={mockTasks} />);

  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  const editButton = screen.getByText("Edit Task"); 
  fireEvent.click(editButton);

  const input = screen.getByPlaceholderText("Enter new task title"); 
  fireEvent.change(input, { target: { value: "Updated Task 1" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);


  await waitFor(() => {
    expect(screen.getByText("Updated Task 1")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});


test("marks a task as completed and reflects the change", async () => {
  render(<Tasks tasks={mockTasks} />);


  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  const completeButton = screen.getByText("Complete Task"); 
  fireEvent.click(completeButton);


  await waitFor(() => {
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});

test("displays completed tasks for a sprint with required information", async () => {
  render(<Tasks tasks={mockTasks} />);


  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });


  expect(screen.getByText("Assigned to: User 1")).toBeInTheDocument();
  expect(screen.getByText("Assigned to: User 2")).toBeInTheDocument();


  expect(screen.getByText("5h")).toBeInTheDocument();
  expect(screen.getByText("3h")).toBeInTheDocument();


  expect(screen.getByText("Real Hours: 4h")).toBeInTheDocument(); 
  expect(screen.getByText("Real Hours: 2h")).toBeInTheDocument(); 
});
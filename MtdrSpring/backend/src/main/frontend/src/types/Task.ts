// src/types/Task.ts
export interface Task {
  id: number;
  title: string;
  type: string;
  startDate: string;
  dueDate: string;
  description: string;
  assignee: string;
  priority: string;
  state: string;
}
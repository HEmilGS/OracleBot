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
  project_id: number; // Agregado
  user_id: number;    // Agregado
  sprint: {
    id: number;
    // otras propiedades del sprint si las hay
  }; // Agregado
}
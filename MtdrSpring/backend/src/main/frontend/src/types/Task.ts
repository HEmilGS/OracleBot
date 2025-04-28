// src/types/Task.ts
export interface Task {
  id: number;
  title: string;
  type: string;
  creation_ts: string;
  deadline: string;
  description: string;
  assignee: string; // Agregado
  priority: string;
  status: string;
  project_id: number; // Agregado
  user_id: number;    // Agregado
  sprint: {
    id: number;
    // otras propiedades del sprint si las hay
  }; // Agregado
  tiempoEstimado: string; // Agregado
}
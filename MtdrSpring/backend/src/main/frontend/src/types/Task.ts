// src/types/Task.ts
export type Task = {
  id: number;
  title: string;
  type: string;
  creation_ts: string;
  deadline: string;
  description: string;
  assignee: string;
  prioridad: string;
  status: string;
  project_id: number;
  user_id: number;
  user: { idUsuario: number }; // <--- AGREGA ESTA LÍNEA
  sprint: { id: number };
  tiempoEstimado: string;
  tiempoReal: string;
};

import React, { useEffect, useState } from "react";
import axios from "axios";

interface TareaTerminada {
  sprint: string;
  usuario: string;
  tareas: {
    nombre: string;
    horasEstimadas: number;
    horasReales: number;
  }[]; 
}

interface TareaApi {
  title: string;
  sprint: { nombre: string };
  user: { nombre: string };
  tiempoEstimado: number;
  tiempoReal: number;
  status: string;
}

const Reportes: React.FC<{ usuarioFiltro?: string }> = ({ usuarioFiltro }) => {
  const [data, setData] = useState<TareaTerminada[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<TareaApi[]>("/api/todo", {
        params: usuarioFiltro ? { usuario: usuarioFiltro } : {},
      })
      .then((res) => {
        const completadas = res.data.filter(
          (t) => t.status && t.status.toLowerCase() === "completada"
        );
        const agrupado: { [sprint: string]: { [usuario: string]: TareaTerminada["tareas"] } } = {};
        completadas.forEach((t) => {
          const sprint = t.sprint?.nombre || "Sin Sprint";
          const usuario = t.user?.nombre || "Sin Usuario";
          if (!agrupado[sprint]) agrupado[sprint] = {};
          if (!agrupado[sprint][usuario]) agrupado[sprint][usuario] = [];
          agrupado[sprint][usuario].push({
            nombre: t.title,
            horasEstimadas: t.tiempoEstimado || 0,
            horasReales: t.tiempoReal || 0,
          });
        });
        const resultado: TareaTerminada[] = [];
        Object.entries(agrupado).forEach(([sprint, usuarios]) => {
          Object.entries(usuarios)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([usuario, tareas]) => {
              resultado.push({ sprint, usuario, tareas });
            });
        });
        setData(resultado);
      })
      .finally(() => setLoading(false));
  }, [usuarioFiltro]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reporte de Tareas Terminadas por Sprint</h2>
      {data.length === 0 && <div>No hay tareas completadas.</div>}
      {data.map((grupo, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="font-semibold mb-2">
            Sprint: <span className="text-blue-700">{grupo.sprint}</span>
          </h3>
          <table className="min-w-full border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Task Name</th>
                <th className="px-4 py-2 border">Developer</th>
                <th className="px-4 py-2 border">Estimated Hours</th>
                <th className="px-4 py-2 border">Actual Hours</th>
              </tr>
            </thead>
            <tbody>
              {grupo.tareas.map((tarea, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 border">{tarea.nombre}</td>
                  <td className="px-4 py-2 border">{grupo.usuario}</td>
                  <td className="px-4 py-2 border text-center">{tarea.horasEstimadas}</td>
                  <td className="px-4 py-2 border text-center">{tarea.horasReales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Reportes;
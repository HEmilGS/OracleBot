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
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Reporte de Tareas Terminadas por Sprint</h2>
      {data.length === 0 && <div className="text-center text-gray-500">No hay tareas completadas.</div>}
      <div className="grid gap-8 md:grid-cols-2">
        {data.map((grupo, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-purple-700">
                Sprint: <span className="text-blue-700">{grupo.sprint}</span>
              </h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {grupo.usuario}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="px-4 py-2 border-b">Task Name</th>
                    <th className="px-4 py-2 border-b">Estimated Hours</th>
                    <th className="px-4 py-2 border-b">Actual Hours</th>
                    <th className="px-4 py-2 border-b">Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.tareas.map((tarea, i) => {
                    const diff = tarea.horasReales - tarea.horasEstimadas;
                    return (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2">{tarea.nombre}</td>
                        <td className="px-4 py-2 text-center">{tarea.horasEstimadas}</td>
                        <td className="px-4 py-2 text-center">{tarea.horasReales}</td>
                        <td className={`px-4 py-2 text-center font-semibold ${diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-gray-600"}`}>
                          {diff > 0 ? `+${diff}` : diff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
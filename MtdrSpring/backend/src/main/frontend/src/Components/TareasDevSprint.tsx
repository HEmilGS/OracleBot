import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ApiData {
  sprint: string;
  usuario: string;
  tareasCompletadas: number;
}

interface SprintRow {
  sprint: string;
  [usuario: string]: string | number;
} 

const TareasDevSprint: React.FC<{ usuarioFiltro?: string }> = ({ usuarioFiltro }) => {
  const [data, setData] = useState<SprintRow[]>([]);
  const [usuarios, setUsuarios] = useState<string[]>([]);

  useEffect(() => {
    axios.get<ApiData[]>("/api/todo/tareas-sprint", {
      params: usuarioFiltro ? { usuario: usuarioFiltro } : {},
    })
      .then(res => {
        const raw = res.data;
        const sprints = Array.from(new Set(raw.map(item => item.sprint)));
        const usuariosUnicos = Array.from(new Set(raw.map(item => item.usuario)));
        setUsuarios(usuariosUnicos);

        const agrupado: SprintRow[] = sprints.map(sprint => {
          const fila: SprintRow = { sprint };
          usuariosUnicos.forEach(usuario => {
            const registro = raw.find(item => item.sprint === sprint && item.usuario === usuario);
            fila[usuario] = registro ? registro.tareasCompletadas : 0;
          });
          return fila;
        });

        setData(agrupado);
      });
  }, [usuarioFiltro]);

  return (
    <div>
      <h3 className="font-semibold mb-2">Tareas completadas por usuario y sprint</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sprint" />
          <YAxis label={{ value: "Tareas completadas", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          {usuarios.map((usuario, idx) => (
            <Bar key={usuario} dataKey={usuario} fill={["#8884d8", "#82ca9d", "#00bfff", "#4682b4", "#ffc658"][idx % 5]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TareasDevSprint;
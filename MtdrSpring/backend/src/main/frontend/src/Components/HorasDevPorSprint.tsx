import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ApiData {
  sprint: string;
  usuario: string;
  tiempoReal: number;
}

interface SprintRow {
  sprint: string;
  [usuario: string]: string | number;
}

const colores = ["#42a5f5", "#7e57c2", "#26a69a", "#bdbdbd", "#ef5350", "#ffa726"];

const HorasDevPorSprint: React.FC<{ usuarioFiltro?: string }> = ({ usuarioFiltro }) => {
  const [data, setData] = useState<SprintRow[]>([]);
  const [usuarios, setUsuarios] = useState<string[]>([]);

  useEffect(() => {
    axios.get<ApiData[]>("/api/todo/horas-sprint", {
      params: usuarioFiltro ? { usuario: usuarioFiltro } : {},
    }).then(res => {
      const raw = res.data;
      // Ordenar los sprints de forma ascendente
      const sprints = Array.from(new Set(raw.map(item => item.sprint)))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      const usuariosUnicos = Array.from(new Set(raw.map(item => item.usuario)));
      setUsuarios(usuariosUnicos);

      const agrupado: SprintRow[] = sprints.map(sprint => {
        const fila: SprintRow = { sprint };
        usuariosUnicos.forEach(usuario => {
          const registro = raw.find(item => item.sprint === sprint && item.usuario === usuario);
          fila[usuario] = registro ? registro.tiempoReal : 0;
        });
        return fila;
      });

      setData(agrupado);
    });
  }, [usuarioFiltro]);

  return (
    <div>
      <h3 className="font-semibold mb-2">Horas trabajadas por sprint (KPI)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sprint" />
          <YAxis label={{ value: "Horas trabajadas", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          {usuarios.map((usuario, idx) => (
            <Bar key={usuario} dataKey={usuario} name={usuario} fill={colores[idx % colores.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorasDevPorSprint;
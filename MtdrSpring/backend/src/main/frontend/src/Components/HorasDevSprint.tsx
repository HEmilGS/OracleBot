import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ApiData {
  sprint: string;
  horas: number;
}

const HorasDevSprint: React.FC<{ usuarioFiltro?: string }> = ({ usuarioFiltro }) => {
  const [data, setData] = useState<ApiData[]>([]);

  useEffect(() => {
    axios.get<ApiData[]>("/api/todo/horas-totales-sprint", {
      params: usuarioFiltro ? { usuario: usuarioFiltro } : {},
    })
      .then(res => setData(res.data));
  }, [usuarioFiltro]);
 
  return (
    <div>
      <h3 className="font-semibold mb-2">(Horas Totales trabajadas por Sprint)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sprint" />
          <YAxis label={{ value: "Horas", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="horas" name="Hours Invested" fill="#b39ddb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorasDevSprint;
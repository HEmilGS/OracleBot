import React, { useState } from "react";
import HorasDevSprint from "../Components/HorasDevSprint";
/*import HorasTotales from "../Components/HorasTotales";*/
import TareasDevSprint from "../Components/TareasDevSprint";
import HorasDevPorSprint from "@/Components/HorasDevPorSprint";
import Reportes from "@/Components/Reportes";

const KpiDashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [usuarioFiltro, setUsuarioFiltro] = useState("");

  const handleBuscar = () => {
    setUsuarioFiltro(inputValue);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard de KPIs</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar usuario por nombre..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
      <div className="mb-8">
        <HorasDevSprint usuarioFiltro={usuarioFiltro} />
      </div>
      <div className="mb-8">
        <HorasDevPorSprint usuarioFiltro={usuarioFiltro} />
      </div>
      <div className="mb-8">
        <TareasDevSprint usuarioFiltro={usuarioFiltro} />
      </div>
      <div className="mb-8">
        <Reportes usuarioFiltro={usuarioFiltro} />
      </div>
      {/*<div className="mb-8">
        <HorasTotales />
      </div>*/}
    </div>
  );
};

export default KpiDashboard;
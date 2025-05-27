import React from "react";
import HorasDevSprint from "../Components/HorasDevSprint";
/*import HorasTotales from "../Components/HorasTotales";*/
import TareasDevSprint from "../Components/TareasDevSprint";
import HorasDevPorSprint from "@/Components/HorasDevPorSprint";
import Reportes from "@/Components/Reportes";


const KpiDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard de KPIs</h2>
      <div className="mb-8">
        <HorasDevSprint />
      </div>
      <div className="mb-8">
        <HorasDevPorSprint />
      </div>

      <div className="mb-8">
        <TareasDevSprint />
      </div>

      <div className="mb-8">
        <Reportes />
      </div>

      {/*<div className="mb-8">
        <HorasTotales />
      </div>*/}
    </div>
  );
};

export default KpiDashboard;
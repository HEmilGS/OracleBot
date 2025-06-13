"use client";

import { useEffect, useState } from "react";
import { UserRound, UserPlus, Mail } from "lucide-react";

type Usuario = {
  idUsuario: number;
  nombre: string;
  correo: string;
  rol: string;
  equipo?: { idEquipo: number; nombre: string };
  telefono: string;
  ciudad: string;
  descripcion: string;
};

type Tarea = {
  id: number;
  nombre: string;
  descripcion: string;
  status: string;
};

function User() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [miembros, setMiembros] = useState<Usuario[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/usuarios/3")
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        if (data.equipo?.idEquipo) {
          fetch(`http://localhost:8081/api/usuarios/equipo/${data.equipo.idEquipo}`)
            .then((res) => res.json())
            .then((miembrosData) => {
              setMiembros(miembrosData.filter((u: Usuario) => u.idUsuario !== data.idUsuario));
            });
        }
        fetch(`http://localhost:8081/api/todo?usuarioId=${data.idUsuario}`)
          .then((res) => res.json())
          .then((tareasData) => setTareas(tareasData));
      });
  }, []);

  const completadas = tareas.filter((t) => t.status === "Completada").length;
  const enProgreso = tareas.filter((t) => t.status === "En progreso").length;

  if (!usuario) {
    return <div className="p-10 text-lg text-gray-600">Cargando usuario o no encontrado...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full p-6 gap-6 bg-gray-100">
      {/* Sidebar de Usuario */}
      <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-4 cursor-pointer">
          Editar perfil
        </div>
        <div className="rounded-full bg-gray-100 flex items-center justify-center h-36 w-36 shadow-md">
          <UserRound size={90} className="text-gray-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{usuario.nombre}</h2>
        <p className="text-sm text-gray-500">{usuario.ciudad}</p>
        <p className="text-sm text-gray-500 mb-2">
          {usuario.equipo ? "Team 2" : "Sin equipo"}
        </p>
        <div className="w-full border-t border-gray-200 my-4" />
        <div className="flex items-center w-full mb-3">
          <UserRound size={20} className="text-gray-400 mr-3" />
          <span className="text-sm text-gray-600">{usuario.rol}</span>
        </div>
        <div className="flex items-center w-full mb-3">
          <UserPlus size={20} className="text-gray-400 mr-3" />
          <span className="text-sm text-gray-600">{usuario.telefono}</span>
        </div>
        <div className="flex items-center w-full">
          <Mail size={20} className="text-gray-400 mr-3" />
          <span className="text-sm text-gray-600 break-words">{usuario.correo}</span>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex flex-col gap-6 w-full lg:w-3/4">
        {/* Título */}
        <div className="text-2xl font-bold text-gray-800">Panel de Usuario</div>

        {/* Miembros del equipo */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Miembros del Equipo</h3>
          <div className="max-h-48 overflow-y-auto divide-y divide-gray-100">
            {miembros.length === 0 ? (
              <p className="text-sm text-gray-400">No hay otros miembros en tu equipo</p>
            ) : (
              miembros.map((miembro) => (
                <div key={miembro.idUsuario} className="flex items-center py-2">
                  <UserRound size={24} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{miembro.nombre}</p>
                    <p className="text-xs text-gray-500">{miembro.rol}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tareas */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumen de Tareas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl shadow-inner">
              <p className="text-sm text-green-700 font-medium">Completadas</p>
              <h4 className="text-xl font-bold text-green-800">{completadas}</h4>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl shadow-inner">
              <p className="text-sm text-yellow-700 font-medium">En Progreso</p>
              <h4 className="text-xl font-bold text-yellow-800">{enProgreso}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
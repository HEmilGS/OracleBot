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

interface UserProps {
  usuario: Usuario;
}

function User({ usuario }: UserProps) {
  const [miembros, setMiembros] = useState<Usuario[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    // Cargar miembros del equipo
    if (usuario.equipo && usuario.equipo.idEquipo) {
      fetch(`/api/usuarios/equipo/${usuario.equipo.idEquipo}`)
        .then((res) => res.json())
        .then((miembrosData) => {
          setMiembros(miembrosData.filter((u: Usuario) => u.idUsuario !== usuario.idUsuario));
        });
    }
    // Cargar tareas del usuario
    fetch(`/api/todo?usuarioId=${usuario.idUsuario}`)
      .then((res) => res.json())
      .then((tareasData) => setTareas(tareasData));
  }, [usuario]);

  const completadas = tareas.filter((t) => t.status === "Completada").length;
  const enProgreso = tareas.filter((t) => t.status === "En progreso").length;

  if (!usuario) {
    return <div className="p-10 text-lg text-gray-600">Cargando usuario o no encontrado...</div>;
  }

  return (
    <div className="flex h-screen ml-20">
      {/* usercard y horas trabajadas */}
      <div className="h-full w-1/4 flex flex-col">
        <div className="bg-white flex flex-col items-center w-full min-h-[450px] mt-10 pt-5 shadow-lg rounded-xl">
          <div className="bg-[#4BA665]/15 text-[#4BA665] w-auto px-2 rounded-xl text-lg cursor-pointer">Edit</div>
          <div className="flex flex-col items-center justify-center mt-10 border rounded-full h-40 w-40">
            <UserRound size={100} />
          </div>
          <h1 className="text-xl text-gray-500 mt-5">{usuario.nombre}</h1>
          <h1 className="text-lg text-gray-500 mt-2">{usuario.ciudad}</h1>
          <h1 className="text-lg text-gray-500 mt-2">{usuario.equipo ? `Team ${usuario.equipo.idEquipo}` : "Sin equipo"}</h1>
          <div className="w-5/6 h-px bg-gray-400 mt-5"></div>
          <div className="flex flex-row w-5/6 mt-8">
            <UserRound size={25} />
            <h1 className="text-sm text-gray-500 ml-3 mt-1">{usuario.rol}</h1>
          </div>
          <div className="flex flex-row w-5/6 mt-8">
            <UserPlus size={25} />
            <h1 className="text-sm text-gray-500 ml-3 mt-1">{usuario.telefono}</h1>
          </div>
          <div className="flex flex-row w-5/6 mt-8 mb-5">
            <Mail size={25} />
            <h1 className="text-sm text-gray-500 ml-3 mt-1">{usuario.correo}</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl h-1/5 mt-10">
        <div className="flex justify-between items-center mb-4 p-6">
              <h2 className="text-2xl font-bold">Tus Tareas</h2>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6"></div>
            <div className="flex flex-col gap-2 p-6">
              <span className="text-gray-700 font-medium">
                Completadas: <span className="font-bold">{completadas}</span>
              </span>
              <span className="text-gray-700 font-medium">
                En progreso: <span className="font-bold">{enProgreso}</span>
              </span>
            </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex flex-col gap-6 w-full lg:w-3/4">
        {/* Título */}
        <div className="text-2xl font-bold text-gray-800">Panel de Usuario</div>


        <div className="flex items-center flex-col bg-white shadow-lg w-5/6 h-2/4 mb-10 ml-9">
          <div className="flex flex-row justify-between items-center p-4 text-lg font-bold w-full ">
            Miembros del Equipo
          </div>
          <div className="w-5/6 h-5/6 flex flex-col items-center py-4 overflow-y-auto">
            {miembros.length === 0 ? (
              <p className="text-sm text-gray-400">No hay otros miembros en tu equipo</p>
            ) : (
              miembros.map((miembro) => (
                <div key={miembro.idUsuario} className="flex items-center mb-2 shadow-lg rounded-xl h-16 w-full p-4 bg-white hover:bg-gray-100 transition-colors">
                  <UserRound className="mr-2" />
                  <span className="font-medium">{miembro.nombre}</span>
                  <span className="ml-2 text-gray-500 text-sm">{miembro.rol}</span>
                </div>
              ))
            )}
          </div>
        </div>




        {/* tarjetas de proyectos del usuario */}
        {/*<div className="w-5/6">
          {proyectos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
              <span className="text-gray-400">No tienes proyectos asignados.</span>
            </div>
          ) : (
            proyectos.map((proyecto) => (
              <div key={proyecto.idProyecto} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{proyecto.nombre}</h2>
                  <div className="flex space-x-3">
                    <span className="bg-red-100 text-red-600 px-4 py-1 rounded-md text-sm">
                      {proyecto.estado}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6"></div>
                <p className="text-gray-700 mb-8">{proyecto.descripcion}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock stroke="red" size={18} />
                    <span className="text-red-500 font-medium">
                      {new Date(proyecto.fechaInicio).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>*/}
      </div>
    </div>
  );
}

export default User;
import { useEffect, useState } from "react";
import { NotepadText, Clock, UserRound, UserPlus, Mail } from "lucide-react";
import axios from "axios";

interface UserData {
  idUsuario: number;
  nombre: string;
  correo: string;
  rol: string;
  fechaCreacion: string;
  equipo: {
    id: number;
    nombre: string;
  };
}

interface UserProps {
  userData: UserData | null;
}

function User({ userData }: UserProps) {
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen ml-20">
      {/* usercard y horas trabajadas */}
      <div
        className="bg-white flex flex-col items-center w-full h-3/5 mt-15 pt-5 shadow-lg rounded-xl"
        data-testid="user-card"
      >
        <div className="bg-[#4BA665]/15 text-[#4BA665] w-auto px-2 rounded-xl text-lg cursor-pointer">Edit</div>

        <div className="flex flex-col items-center justify-center mt-10 border rounded-full h-50 w-50">
          <UserRound size={100} />
        </div>
        <h1 className="text-xl text-gray-500 mt-5">{userData.nombre}</h1>
        <h1 className="text-lg text-gray-500 mt-2">{userData.equipo?.nombre || "Sin equipo"}</h1>
        <h1 className="text-lg text-gray-500 mt-2">{userData.rol}</h1>
        <div className="w-5/6 h-px bg-gray-400 mt-5"></div>
        <div className="flex flex-row w-5/6 mt-8">
          <UserRound size={25} />
          <h1 className="text-sm text-gray-500 ml-3 mt-1">{userData.rol}</h1>
        </div>

        <div className="flex flex-row w-5/6 mt-8">
          <UserPlus size={25} />
          <h1 className="text-sm text-gray-500 ml-3 mt-1">{userData.fechaCreacion}</h1>
        </div>

        <div className="flex flex-row w-5/6 mt-8">
          <Mail size={25} />
          <h1 className="text-sm text-gray-500 ml-3 mt-1">{userData.correo}</h1>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-xl h-1/5 mt-10"></div>

      {/* team member y proyecto */}
      <div className="w-3/4 flex flex-col items-center">
        <div className="w-full flex flex-row justify-between items-center ml-[20%] mb-7">
          <h1 className="text-2xl font-bold">{userData.rol}</h1>
        </div>

        <div className="flex items-center flex-col bg-white shadow-lg w-5/6 h-2/4 mb-10">
          <div className="flex flex-row justify-between items-center p-4 text-lg font-bold w-full">
            Team Members
          </div>

          <div className="border w-5/6 h-5/6 flex justify-center">desarrolladores del equipo aqui</div>
        </div>

        {/* tarjeta de proyecto */}
        <div className="w-5/6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              {/* nombre del proyecto */}
              <h2 className="text-2xl font-bold">Adoddle</h2>
              <div className="flex space-x-3">
                <span className="bg-red-100 text-red-600 px-4 py-1 rounded-md text-sm">Offtrack</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6"></div>
            {/* descripcion del proyecto */}
            <p className="text-gray-700 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock stroke="red" size={18} />
                {/* creacion */}
                <span className="text-red-500 font-medium">05 APRIL 2023</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex -space-x-2">
                {/* usuarios activos opcional */}
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                />
                <img
                  className="h-8 w-8 rounded-full border-2 border-white bg-yellow-300"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                />
                <img
                  className="h-8 w-8 rounded-full border-2 border-white bg-blue-300"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                />
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                />
                <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-white bg-gray-100 text-xs text-gray-500">
                  +2
                </span>
              </div>

              {/* numero de tareas pendientes */}
              <div className="flex items-center text-gray-500">
                <NotepadText className="mr-1" />
                <span>14 issues</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
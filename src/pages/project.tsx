import { NotepadText, Clock} from "lucide-react";

export default function Project() {
    return (
        // pendiente de hacer un map para mostrar los proyectos
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="bg-white rounded-lg shadow-sm p-6 ">
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
              <Clock stroke="red" size={18}/>
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
              <NotepadText className="mr-1"/>
                    
                <span>14 issues</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Pagination opcional*/}
        <div className="flex justify-center mt-8 fixed bottom-0 left-[15%] right-0 p-4 shadow-md">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded text-gray-500 hover:text-gray-700">Previous</button>
            <button className="px-3 py-1 rounded bg-red-600 text-white">1</button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">2</button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">3</button>
            <button className="px-3 py-1 rounded text-gray-500 hover:text-gray-700">Next</button>
          </nav>
        </div>
      </div>
    )
  }
  
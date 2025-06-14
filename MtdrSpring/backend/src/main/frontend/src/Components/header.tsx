import { UserButton } from '@clerk/clerk-react';
import { Webhook } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


interface Usuario {
  nombre: string;
  rol: string;
}

interface HeaderProps {
  usuario: Usuario | null;
}

function Header({ usuario }: HeaderProps) {
const navigate = useNavigate();
const handleRoute = (path: string) => {
  navigate(path);
};

  const location = useLocation();

  const handleFocusClick = () => {
    if (location.pathname === '/focus') {
      // Si ya estás en focus, regresa a la última ruta o al dashboard
      const lastPath = sessionStorage.getItem('lastPathBeforeFocus') || '/';
      navigate(lastPath);
    } else {
      // Guarda la ruta actual antes de ir a focus
      sessionStorage.setItem('lastPathBeforeFocus', location.pathname);
      navigate('/focus');
    }
  };



  return (
    <header className="p-4 flex justify-between items-center w-[calc(100%-16.66%)] bg-white shadow-md fixed top-0 left-[16.66%] z-50">
      <h1 className="text-xl font-bold"></h1>

      <div className="flex items-center gap-6">
        <button
          className='shadow-[0px_0px_9px_4px_rgba(0,_0,_0,_0.1)] size-12 rounded-2xl flex items-center justify-center p-2 cursor-pointer hover:bg-[#F1F1F1]'
          onClick={handleFocusClick}
        >
          <Webhook size={25} className="text-[#C74634]" />
        </button>

        <button
          className='flex items-center rounded-2xl p-2 shadow-[0px_0px_4px_1px_rgba(0,_0,_0,_0.1)] cursor-pointer text-sm'
          onClick={() => handleRoute('/user')}
        >
          <UserButton />
          <div className="ml-3 text-left">
            <p className="text-gray-700 font-semibold">
              {usuario ? usuario.nombre : "Cargando.."}
            </p>
            <p className="text-gray-500 text-xs">
              {usuario ? usuario.rol : ""}
            </p>
          </div>
          <ChevronDown size={20} className="text-gray-500 ml-4" />
        </button>
      </div>
    </header>
  );
}

export default Header;
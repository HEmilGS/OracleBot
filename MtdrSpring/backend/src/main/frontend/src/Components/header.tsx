import { UserButton } from '@clerk/clerk-react';
import { Webhook } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useNavigate} from 'react-router-dom';

interface Usuario {
  nombre: string;
  rol: string;
}

interface HeaderProps {
  usuario: Usuario | null;
}

function Header({ usuario }: HeaderProps) {
const navigate = useNavigate();

//traer información del usuario de la bnase de datos
// const { user } = useAuth();
// const userName = user?.fullName || 'User'; // Reemplaza con el nombre real del usuario
// const userRole = user?.role || 'Project Manager'; // Reemplaza con el rol real del usuario
// const userImage = user?.profileImageUrl || 'default-image-url'; // Reemplaza con la URL de la imagen del usuario
// const userEmail = user?.email || '


const handleRoute = (path: string) => {
  navigate(path);
};

  return (
    <header className="p-4 flex justify-between items-center w-[calc(100%-16.66%)] bg-white shadow-md fixed top-0 left-[16.66%] z-50">
      <h1 className="text-xl font-bold"></h1>

      <input 
        type="text" 
        placeholder="Search for anything" 
        className="w-1/4 p-3 pl-10 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-sm bg-gray-50 text-gray-800 placeholder-gray-500"  
      />


      <div className="flex items-center gap-6">
        <button className='shadow-[0px_0px_9px_4px_rgba(0,_0,_0,_0.1)] size-12 rounded-2xl flex items-center justify-center p-2 cursor-pointer hover:bg-[#F1F1F1]'
        onClick={() => handleRoute('/focus')}
        >
        <Webhook size={25} className="text-[#C74634]"/>
        </button>

        <button className='flex items-center rounded-2xl p-2 shadow-[0px_0px_4px_1px_rgba(0,_0,_0,_0.1)] cursor-pointer text-sm'
        onClick={() => handleRoute('/user')}
        >
          <UserButton />
          <div className="ml-3 text-left">
            <p className="text-gray-700 font-semibold">
              {usuario ? usuario.nombre : "Cargando..."}
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
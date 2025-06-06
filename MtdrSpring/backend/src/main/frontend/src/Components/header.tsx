import { Webhook } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useNavigate} from 'react-router-dom';

function Header() {
const navigate = useNavigate();


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
          <CircleUser size={35} className="text-gray-500 mr-4" />
          <div className="text-left">
            <p className="text-gray-700 font-semibold">Luis Daniel Garcia</p>
            <p className="text-gray-500 text-xs">Project Manager</p>
          </div>
          <ChevronDown size={20} className="text-gray-500 ml-4" />
        </button>
      </div>
    </header>
  );
}

export default Header;
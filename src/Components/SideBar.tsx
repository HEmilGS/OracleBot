import { CirclePlus } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { ListChecks } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Users } from 'lucide-react';
import { Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoute = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-[#282B28] h-screen w-56 py-32 flex flex-col items-center justify-start fixed top-0 left-0">
      <nav className="flex flex-col justify-center space-x-4 p-4 h-full w-full">
        <div
          className="flex items-center justify-center h-1/12 w-full bg-white rounded-xl text-[#282B28] font-bold cursor-pointer"
          onClick={() => handleRoute('/create-project')}
        >
          <CirclePlus size={35} stroke="white" className="mr-1.5" fill="#C74634" />
          Create a project
        </div>

        <div
          className={`mt-10 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/')}
        >
          <LayoutDashboard size={30} className="mr-4 ml-2" strokeWidth={2} />
          Dashboard
        </div>

        <div
          className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/project') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/project')}
        >
          <BriefcaseBusiness size={30} className="mr-4 ml-2" strokeWidth={2} />
          Project
        </div>

        <div
          className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/tasks') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/tasks')}
        >
          <ListChecks size={30} className="mr-4 ml-2" strokeWidth={2} />
          Tasks
        </div>

        <div
          className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/calendar') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/calendar')}
        >
          <Calendar size={30} className="mr-4 ml-2" strokeWidth={2} />
          Calendar
        </div>

        <div
          className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/users') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/users')}
        >
          <Users size={30} className="mr-4 ml-2" strokeWidth={2} />
          Users
        </div>

        <div
          className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/settings') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/settings')}
        >
          <Settings size={30} className="mr-4 ml-2" strokeWidth={2} />
          Settings
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
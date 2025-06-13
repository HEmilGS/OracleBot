import { /*CirclePlus,*/ CirclePlus, Webhook } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { ListChecks } from 'lucide-react';
import { BarChart3 } from 'lucide-react'; 
// import { Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

  interface Usuario {
    rol?: string;
  }
  
  function SideBar({ usuario }: { usuario: Usuario }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoute = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleCreateProject = async () => {
    try {
      const res = await axios.get("/api/usuarios/me");
      const user = res.data;
      if (!user.equipo) {

        navigate("/create-team");
      } else {

        navigate("/create-project");
      }
    } catch {

      navigate("/login");
    }
  };

  return (
    <div className="bg-[#282B28] h-screen w-1/6 pt-9 flex flex-col items-center justify-start fixed top-0 left-0">
      <div className='text-[#C74634] font-bold text-2xl flex mb-15'>
        <Webhook  size={35}/>
        <h1 className='ml-3'>CICD</h1>
      </div>
      <nav className="flex flex-col justify-start space-x-4 p-4 h-full w-full">
        {usuario?.rol === "ADMIN" && (
          <div
            className="flex items-center justify-center h-1/12 w-full bg-white rounded-xl text-[#282B28] font-bold cursor-pointer"
            onClick={handleCreateProject}
          >
            <CirclePlus size={35} stroke="white" className="mr-1.5" fill="#C74634" />
            Create a project
          </div>
        )}

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

        {usuario?.rol === "ADMIN" && (
          <div
            className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
              isActive('/kpis') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
            }`}
            onClick={() => handleRoute('/kpis')}
          >
            <BarChart3 size={30} className="mr-4 ml-2" strokeWidth={2} />
            KPIs
          </div>
        )}

        {/* <div
          className={`mt-7 text-sm flex items-center justify-start h-1/12 w-full rounded-lg cursor-pointer pm ${
            isActive('/calendar') ? 'bg-white text-black' : 'text-[#F1F1F1] hover:bg-white hover:text-black'
          }`}
          onClick={() => handleRoute('/calendar')}
        >
          <Calendar size={30} className="mr-4 ml-2" strokeWidth={2} />
          Calendar
        </div> */}


      </nav>

      {/* <div className='w-1/4 mb-5'>
          <img src="src/icons/oracle-corporation-logo.svg" alt="Oracle Logo"/>
          <img src="src/icons/oracle-6.svg" alt="Oracle Logo" />
      </div> */}
    </div>
  );
}

export default SideBar;
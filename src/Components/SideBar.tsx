import {CirclePlus } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import {ListChecks} from 'lucide-react';
import {Calendar} from 'lucide-react';
import {Users} from 'lucide-react';
import {Settings} from 'lucide-react';
import { NavLink } from 'react-router-dom';


// import React from 'react';

function SideBar() {
  return (

    
    <div className="bg-[#282B28] h-screen w-1/5 py-32 flex flex-col items-center justify-start ">

      <nav className="flex flex-col justify-center space-x-4 p-4 h-full w-full">

        <div className="flex items-center justify-center h-1/12 w-3/4 bg-white rounded-3xl text-[#282B28] font-bold cursor-pointewhite">
          <CirclePlus size={35} stroke='white' className='mr-4' fill='#C74634'/>
          Create a project
        </div>  

        <div className='mt-10 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black '>
        <LayoutDashboard size={25}  className='mr-4 ml-2' strokeWidth={2} />
        <NavLink to="/" >Dasboard</NavLink>
        </div>

        <div className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <BriefcaseBusiness size={25}  className='mr-4 ml-2' strokeWidth={2}/>
          Project
        </div>



        <div className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <ListChecks size={25} className='mr-4 ml-2' strokeWidth={2}/>
        <NavLink to="/tasks" >Tasks</NavLink>
        </div>


        <div className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <Calendar size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Calendar
        </div>

        <div className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <Users size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Users
        </div>

        <div className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <Settings size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Settings
        </div>

        </nav>

        
      </div>
  );
}

export default SideBar;
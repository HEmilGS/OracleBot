import {CirclePlus } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import {ListChecks} from 'lucide-react';
import {Calendar} from 'lucide-react';
import {Users} from 'lucide-react';
import {Settings} from 'lucide-react';


// import React from 'react';

function SideBar() {
  return (
      <div className="bg-[#282B28] h-screen w-1/5 py-32 flex flex-col items-center justify-start ">

        <button className="flex items-center justify-center h-1/12 w-3/4 bg-white rounded-3xl text-[#282B28] font-bold cursor-pointewhite">
          <CirclePlus size={35} stroke='white' className='mr-4' fill='#C74634'/>
          Create a project
        </button>  

        <button className='mt-10 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black '>
        <LayoutDashboard size={25}  className='mr-4 ml-2' strokeWidth={2} />
          Dashboard
        </button>

        <button className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <BriefcaseBusiness size={25}  className='mr-4 ml-2' strokeWidth={2}/>
          Project
        </button>

        <button className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <ListChecks size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Tasks
        </button>

        <button className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <Calendar size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Calendar
        </button>

        <button className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <Users size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Users
        </button>

        <button className='mt-5 flex items-center justify-start h-1/12 w-3/4 rounded-3xl text-[#F1F1F1] cursor-pointer pm hover:bg-white hover:text-black hover:stroke-black'>
        <Settings size={25} className='mr-4 ml-2' strokeWidth={2}/>
          Settings
        </button>
        
      </div>
  );
}

export default SideBar;
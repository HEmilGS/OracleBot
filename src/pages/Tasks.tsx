import { useState } from 'react';
import { Users } from 'lucide-react';
import { Lightbulb } from 'lucide-react';

function Tasks() {
    // Estado para manejar las tareas
    const [tasks, setTasks] = useState(['Auditoría de Seguridad', 'Desarrollo Frontend', 'Desarrollo de APIs']);
    const [newTask, setNewTask] = useState('');

    // Función para agregar una nueva tarea
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([newTask, ...tasks]); // Agrega la nueva tarea al principio del array
            setNewTask('');
        }
    };

    return (
        <div className="h-screen">
            <div>
                <h1 className="text-md text-[#B39D93] ml-4 mt-4">Project / Tasks</h1>
            </div>

            <div className="flex flex-row items-center mt-3">
                <h1 className="ml-4 text-xl">Tasks</h1>
                <Users className='ml-10' />
                <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665] ml-6">OnTrack</span>
                <div className="flex flex-row items-center space-x-4 ml-auto mr-5">
                    <button 
                        className="flex justify-center items-center bg-[#C74634] text-white rounded-lg h-10 px-4"
                        onClick={addTask}
                    >
                        Create Task
                    </button>
                    <div className="flex flex-col items-center mb-4">
                        <span className="text-sm text-gray-500">Time Spent</span>
                        <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">2M : 0W : 0D</span>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <span className="text-sm text-gray-500">Deadline</span>
                        <span className="text-lg bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">6M : 0W : 0D</span>
                    </div>
                </div>
            </div>

            <div className='h-full flex flex-col items-center p-4'>
                {/* <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="mb-4 p-2 border rounded"
                /> */}
                <ul className="w-full ">
                    {tasks.map((task, index) => (
                        <li key={index} className="bg-white p-2 mb-2 h-1/2 rounded-2xl shadow-md">
                            <div className='h-full flex flex-row items-center justify-start'>
                            <Lightbulb/>
                            <div className=' flex flex-col items-start justify-start ml-4'>
                                <span className='font-bold'> {task} </span>
                                <div >
                                <span className="text-sm text-gray-500">#402235 opened 10 days ago</span>
                                <span className='ml-4 text-sm  bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]'>Completed</span>
                                </div>
                            </div>
                            <div className='flex flex-row items-center mb-4 ml-auto mr-5'>
                                <span className="text-md bg-[#4BA665]/15 w-auto px-2 rounded-xl text-[#4BA665]">1M : 3W : 0D</span>
                                <Users className='ml-10' />
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Tasks;
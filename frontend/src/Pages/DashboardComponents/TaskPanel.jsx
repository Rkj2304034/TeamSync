import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import api from '../../api/axios';



const TasksPanel = ({setSelectedTaskId , tasks }) => {


    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-[calc(100vh-10rem)] min-h-[580px]">


            <div className="border-b border-slate-100 pb-4 mb-4 space-y-3">

                <div className="flex items-center ">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">My Tasks</h2>
                </div>



                {/* <div className="flex gap-2">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="flex-1 text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1.5 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="All">All Statuses</option><option value="Todo">Todo</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
                    </select>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} className="flex-1 text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1.5 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="All">All Priorities</option><option value="High">Urgent</option><option value="Medium">Medium</option><option value="Low">Low</option>
                    </select>
                </div> */}


            </div>



            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                {tasks.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-sm text-slate-400">No matching tasks.</div>
                ) : (
                    tasks.map(task => <TaskCard setSelectedTaskId={setSelectedTaskId} key={task._id} task={task} />)
                )}
            </div>
        </div>
    );
};

export default TasksPanel;
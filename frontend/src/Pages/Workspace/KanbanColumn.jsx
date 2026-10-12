import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

export default function KanbanColumn({ title , tasks , selectedTaskId , setSelectedTaskId }) {
  return (
    <div className="w-[340px] shrink-0 flex flex-col h-full">
      

      <div className="flex items-center justify-between mb-4 px-1">
        <div className={`flex items-center gap-2 text-sm font-semibold ${
          title === 'In Progress' ? 'text-blue-700' :
          title === 'In Review' ? 'text-purple-700' :
          title === 'Completed' ? 'text-green-700' : 
          'text-gray-900' // Default for 'To Do'
        }`}>
          {title} 
          <span className={`rounded-full px-2 py-0.5 text-xs ${
            title === 'In Progress' ? 'bg-blue-100 text-blue-700' :
            title === 'In Review' ? 'bg-purple-100 text-purple-700' :
            title === 'Completed' ? 'bg-green-100 text-green-700' : 
            'bg-gray-100 text-gray-600' // Default for 'To Do'
          }`}>
            {tasks?.length || 0}
          </span>
        </div>

      </div>


      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4 scrollbar-hide">
        {tasks?.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            isSelected={selectedTaskId === task._id}
            onClick={() => setSelectedTaskId(task._id)}
          />
        ))}
        
      </div>
      
    </div>
  );
}
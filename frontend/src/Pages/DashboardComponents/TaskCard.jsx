const TaskCard = ({ task, setSelectedTaskId }) => {
  const borderColors = { High: '#ef4444', Medium: '#f59e0b', Low: '#94a3b8' };
  
  return (


    <div onClick={() => setSelectedTaskId(task._id) } className="p-4 border border-slate-100 rounded-xl bg-white hover:bg-slate-50/40 border-l-4 transition-all group shadow-sm flex flex-col justify-between" style={{ borderLeftColor: borderColors[task.priority] }}>


      <div>

        <div className="flex justify-between items-start  mb-1">
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{task.title}</h3>

          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded border whitespace-nowrap ${task.priority === 'High' ? 'bg-red-50 text-red-700 border-red-100' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
            {task.priority === 'High' ? 'Urgent' : task.priority}
          </span>
        </div>


        <p className="text-[11px] text-slate-400 font-medium mb-3 flex items-center gap-1 truncate max-w-[180px]">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          {task.project.title}
        </p>

      </div>



      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${task.status === 'Completed' ? 'bg-green-50 text-green-700' : task.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
          {task.status}
        </span>

        <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Due {task.dueDate}
        </span>
      </div>



    </div>
  );
};

export default TaskCard;

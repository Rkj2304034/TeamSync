import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import api from '../../api/axios';

const ProjectsPanel = ({showCreateProject, setShowCreateProject , projects}) => {

  const [search, setSearch] = useState("");


  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-[calc(100vh-10rem)] min-h-[580px]">

      <div className="flex items-center justify-between pb-3 mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Projects Workspace</h2>


        <button onClick={() => setShowCreateProject(!showCreateProject)}  className="flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Add New Project
        </button>
      </div>


      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        { projects?.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12"><p className="text-sm font-semibold">No workspaces found</p></div>
        ) : (
          projects.map(project => <ProjectCard key={project?._id} project={project} />)
        )}
      </div>
    </div>
  );
};

export default ProjectsPanel;

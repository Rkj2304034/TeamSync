import { useContext, useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider";

const ProjectCard = ({ project }) => {

  const navigate = useNavigate();

  const {user} = useContext(authContext)
  console.log(user);
  console.log(project);
 const myRole = project?.members.find(
  member => member?.user?._id?.toString() === user?._id?.toString()
)?.role;

  return (
    <div className="p-6 border border-slate-100 bg-white rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">


      <div>


        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{project?.title}</h3>
            {/* {project.status === 'Archived' && (
              <span className="text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">Archived</span>
            )} */}
          </div>
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${myRole === 'Lead' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-slate-50 text-slate-600'}`}>
            {myRole}
          </span>
        </div>



        <p className="text-sm text-slate-600 leading-relaxed overflow-hidden text-ellipsis line-clamp-3 mb-4">{project?.description}</p>

      </div>




      <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-slate-400 text-xs font-medium">

        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-slate-500 font-semibold">{project?.members.length} active members</span>
        </div>


        <span  onClick={() => navigate(`/project/${project._id}`) } className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Open Workspace →</span>

      </div>




    </div>
  );
};

export default ProjectCard;
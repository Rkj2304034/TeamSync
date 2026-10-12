import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import { authContext } from '../../Context/AuthContextProvider';
import KanbanBoard from './KanbanBoard';
import MemberTab from './MemberTab';
import TaskModal from './TaskModal';
import CreateTaskModal from './CreateTaskModal';
import InviteMemberModal from './InviteMemberModal';


export default function ProjectWorkspace() {

    const {projectId} = useParams();
    const [project , setProject] = useState(null);
    const [tasks, setTasks ] = useState([]);
    const {user} = useContext(authContext);
    const [ selectedTab , setSelectedTab ] = useState("tasks")
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const[showCreateTask, setShowCreateTask] = useState(false);
    const [showInviteModal, setShowInviteModal ] = useState(false);


    const handleSaveChanges = async(taskId, newTask) => {
        try{
            const res = await api.post(`/api/task/${taskId}/update`,newTask)
            if(res.data.success){
                setTasks(res.data.tasks)
            }
        }
        catch(error){
            console.log(error)
        }
    }


    const myRole = project?.members.find(
        member => member?.user?._id.toString() === user?._id.toString()
    )?.role;


    const selectedTask = tasks?.find(task => task._id === selectedTaskId)


    const getProject = async() => {
        try{
            const res = await api.get(`/api/project/${projectId}`)

        if(res.data.success){
            setProject(res.data.project)
        }
        }
        catch(error){
            console.log(error)
        }
    }    


    const getProjectTasks = async() => {
        try{

            const res = await api.get(`/api/project/${projectId}/tasks`);
            if(res.data.success){
                setTasks(res.data.tasks);
            }

        }
        catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        getProject();
        getProjectTasks();
    },[]) 


    const handleNewTask = async(newTask) => {
        
        try{

            const res = await api.post(`/api/project/${project._id}/task`, newTask)
            
            if(res.data.success){
                const tsk= res.data.task;

                setTasks(prev => [...prev, tsk])
            }

        }
        catch(error){
            console.log(error)
        }

    }



    return (
        <div className='flex ' >
            <div className="flex flex-col h-screen w-full bg-[#fcfcfc] text-gray-900 font-sans overflow-hidden">
            <Header project={project} role={myRole} tasks={tasks} selectedTab={selectedTab} setSelectedTab={setSelectedTab} onCreateTaskClick={ () => setShowCreateTask(true) }  onInviteMemberClick={() => setShowInviteModal(true)}   />

            <div className="flex flex-1 min-h-0 overflow-hidden relative">
                
                {
                    (selectedTab === "tasks")? (
                        <KanbanBoard
                    tasks={tasks}
                    selectedTaskId={selectedTaskId}
                    setSelectedTaskId={setSelectedTaskId}
                />
                    ) : (
                        <MemberTab  members={project?.members} />
                    )
                }

                
            </div>
        </div>

        {selectedTask && (
                    <TaskModal
                        task={selectedTask}
                        onClose={() => setSelectedTaskId(null)}
                        userRole={myRole}
                        onUpdateTask={handleSaveChanges}
                    />
                )}


        {
            showCreateTask && ( <CreateTaskModal onClose={() => setShowCreateTask(false)}  onCreateTask={handleNewTask} project={project} /> )
        }


        {
            showInviteModal && ( <InviteMemberModal project={project} onClose={() => setShowInviteModal(false)} /> )
        }


        </div>

    );
}
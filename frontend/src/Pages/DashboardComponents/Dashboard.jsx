import { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import ProjectsPanel from './ProjectPanel';
import TasksPanel from './TaskPanel';
import CreateProjectModal from './CreateProjectModal';
import api from '../../api/axios';
import TaskModal from '../Workspace/TaskModal';
import { authContext } from '../../Context/AuthContextProvider';



const Dashboard = () => {

  const { user } = useContext(authContext)

  const [showCreateProject, setShowCreateProject] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [role, setRole] = useState("Member");
  const [projects, setProjects] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);


  const handleTaskUpdate = async(taskId,newTask) => {
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


  const getMyTasks = async () => {

    try {

      const res = await api.get("/api/task");
      if (res.data.success) {
        setTasks(res.data.tasks)
        console.log(tasks)
      }

    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    getMyTasks();

  }, [])


  useEffect(() => {

    const tpk = tasks.find(task => 
      task._id === selectedTaskId
    )

    if(tpk) {
      setShowTask(true);
      setSelectedTask(tpk);
    }

    const selectedTaskProject = selectedTask?.project
    const member = selectedTaskProject?.members.find(m =>
      m.user === user?._id
    )

    setRole(member?.role)

  }, [selectedTaskId])


  const getMyProjects = async () => {
    try {
      const res = await api.get("/api/project");

      if (res.data.success) {
        setProjects(res.data.projects)
        console.log(projects);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMyProjects();
  }, [])


  const handleCreateProject = async (newProject) => {

    try {

      const res = await api.post("/api/project", {
        title: newProject.title,
        description: newProject.description
      })

      const projectId = res.data.project._id;


      if (res.data.success) {
        // send invitations
        await Promise.all(
          newProject.members.map(member =>
            api.post(`/api/project/${projectId}/invite`, {
              email: member.user.email,
              role: member.role
            })
          )
        );

        console.log("Invitations sent!");

      }

    }
    catch (error) {
      console.log(error)
    }

  }


  const handleProjectAccepted = (newProject) => {
    setProjects(prev => [...prev, newProject]);
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onProjectAccept={handleProjectAccepted} />

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <ProjectsPanel projects={projects} showCreateProject={showCreateProject} setShowCreateProject={setShowCreateProject} />
          <TasksPanel tasks={tasks} setSelectedTaskId={setSelectedTaskId} />
        </div>
      </main>


      {
        showCreateProject && (
          <CreateProjectModal setShowCreateProject={setShowCreateProject} onCreateProject={handleCreateProject} />
        )
      }


      {
        showTask && (
          <TaskModal task={selectedTask} onClose={() => setShowTask(false)}
            onUpdateTask={handleTaskUpdate} userRole={role } />
        )
      }

    </div>
  );
}

export default Dashboard;
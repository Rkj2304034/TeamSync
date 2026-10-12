import Task from "../models/Task.js";
import Project from "../models/Project.js";


export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      title,
      description,
      assignedTo,
      priority,
      dueDate
    } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const isMember = project.members.some(
      (member) =>
        member.user.toString() === assignedTo
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: "Assigned user is not a project member"
      });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      createdBy: req.user._id,
      priority,
      dueDate
    });

    return res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getTasks = async(req, res) => {
    try{

        const tasks = await Task.find({ project : req.params.projectId }).populate("assignedTo")

        return res.status(200).json({
            success : true,
            tasks : tasks
        })

    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}


export const getTask = async (req, res) => {
  try {

    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("project", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      task
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateTask = async (
  req,
  res
) => {
  try {

    console.log("came to update")

    const { taskId } = req.params;
    const { status, description , priority , dueDate } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    
    task.status = status;
    task.description = description;
    task.priority = priority;
    task.dueDate = dueDate;


    await task.save();

    const tasks = await Task.find().populate("assignedTo");

    return res.status(200).json({
      success: true,
      tasks
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const deleteTask = async (
  req,
  res
) => {
  try {

    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({
      success: true,
      message: "Task deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getMyTasks = async(req,res) => {
  console.log("getting tasks")

  try{

    const myTasks = await  Task.find({assignedTo : req.user._id}).populate("project").populate("assignedTo") ;
    console.log(myTasks)

    return res.status(200).json({
      success : true,
      tasks : myTasks
    })

  }
  catch(error){
    return res.status(500).json({
      messsage : error.message
    })
  }

}
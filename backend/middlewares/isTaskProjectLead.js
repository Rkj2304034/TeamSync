import Project from "../models/Project.js";
import Task from "../models/Task.js";

const isTaskProjectLead = async(req,res,next) => {

    try{

        const {taskId} = req.params;

        const task = await Task.findOne({_id : taskId});
        const project = await Project.findOne({ _id : task.project });
        const user = req.user;


        const member = project.members.some( member =>
            member.user.toString() === user._id.toString()
         );

         if(!member || !member.role === "Lead" ){
            return res.status(403).json({
                message : "Only Admin can perform this operation"
            })
         }


         next();

    }
    catch(error){
        return res.status(500).json({message : error.message})
    }

}

export default isTaskProjectLead;
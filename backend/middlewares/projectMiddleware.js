import Project from "../models/Project.js";

export const isProjectLead = async(req,res,next) => {

try{
    console.log("projectMidll...")
    const user = req.user;
    const projectId = req.params.projectId;
    const project = await Project.findOne({_id : projectId });

    if(!project){
        return res.status(404).json({
            message : "Project not found"
        })
    }

    
    const member = project.members.find(
  (member) => member.user.toString() === user._id.toString()
);
    
    if(!member){
        return res.status(403).json({
            success : false,
            message : "You are not a member of this project"
        })
    }

    req.project = project;

    if (member.role !== "Lead") {
      return res.status(403).json({
        success: false,
        message: "Only project lead can perform this action"
      });
    }


    next();

}
catch(error){
    return res.status(500).json({
        message : error.message
    })
}

}

export const isProjectMember = async(req,res,next)  => {

    try{

        const {projectId} = req.params;

        const project = await Project.findOne({_id : projectId});

        const member = project.members.some( member => 
            member.user.toString() === req.user._id.toString()
         );

        if(!member){
            return res.status(403).json({
                message : "You are not a member of this Project"
            })
        }

        next();

    }
    catch(error){
        return res.status(500).json({
            message : error.message
        })
    }

}
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const isTaskOwnerOrLead = async (req, res,next) => {
    try {
        const task = await Task.findById(req.params.taskId);

        const project = await Project.findById(task.project);

        const member = project.members.find(
            member =>
                member.user.toString() === req.user._id.toString()
        );

        if (!member) {
            return res.status(403).json({
                success: false,
                message: "Not a project member"
            });
        }

        // Lead can update
        if (member.role === "Lead") {
            req.task = task;
            return next();
        }

        // Assigned user can update
        if (task.assignedTo.toString() === req.user._id.toString()) {
            req.task = task;
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Not authorized"
        });

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export default isTaskOwnerOrLead;
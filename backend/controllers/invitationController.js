import Invitation from "../models/Invitation.js";
import Project from "../models/Project.js";
import User from "../models/User.js";


export const sendInvitation = async (req, res) => {
    try {
        console.log("sendign invite...")
        const { projectId } = req.params;
        const { email, role } = req.body;

        const receiver = await User.findOne({ email: email });

        if (!receiver) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const project = await Project.findById(projectId);

        const alreadyMember = project.members.some(
            member =>
                member.user.toString() === receiver._id.toString()
        );

        if (alreadyMember) {
            return res.status(400).json({
                success: false,
                message: "User is already a member"
            });
        }

        const existingInvitation = await Invitation.findOne({
            project: projectId,
            receiver: receiver._id,
            status: "Pending"
        });

        if (existingInvitation) {
            return res.status(400).json({
                success: false,
                message: "Invitation already sent"
            });
        }

        const invitation =
            await Invitation.create({
                project: projectId,
                sender: req.user._id,
                receiver: receiver._id,
                role : role,
            });

        return res.status(201).json({
            success: true,
            invitation
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateInvitation = async (
    req,
    res
) => {

    console.log("accepting invite")

    const invitation =
        await Invitation.findById(req.params.id);

    const { status } = req.body

    if (!invitation) {
        return res.status(404).json({
            message: "Invitation not found"
        });
    }

    invitation.status = status;
    await invitation.save();

    // add member in project
    if (status === "Accepted") {
        const projectId = invitation.project;
        const project = await Project.findById(projectId);

        project.members.push({ user: invitation.receiver , role : invitation.role });
        await project.save();
    }


    await invitation.populate("project")

    return res.status(200).json({
        success: true,
        invitation : invitation
    });
};


export const getInvitations = async (req, res) => {

    try {

        const invitations = await Invitation.find({ receiver: req.user._id, status: "Pending" }).populate("sender", "name email")
            .populate("receiver", "name email")
            .populate("project", "title  description");

        return res.status(200).json({
            success: true,
            invitations
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
import Project from "../models/Project.js";


export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,

      createdBy: req.user._id,

      members: [
        {
          user: req.user._id,
          role: "Lead",
        },
      ],
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getMyProjects = async (req, res) => {

  try {

    const myProjects = await Project.find({
  "members.user": req.user._id
}).populate("members.user" ) ;

    return res.status(200).json({
      success: true,
      projects: myProjects
    })

  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }

}


export const getProject = async (req, res) => {

  try {

    const id = req.params.projectId;

    const project = await Project.findOne({ _id: id }).populate("members.user", "name email "); ;

    return res.status(200).json({
      success: true,
      project: project
    })

  }
  catch (error) {
    return res.status(200).json({
      message: error.message
    })
  }

}


export const updateProject = async (req, res) => {
  try {

    const { title, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
        description
      },
      {
        new: true
      }
    );

    return res.status(200).json({
      success: true,
      project
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const deleteProject = async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.projectId);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};






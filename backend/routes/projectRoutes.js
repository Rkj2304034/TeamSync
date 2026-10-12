import express from "express";

import {
  createProject,
  getMyProjects,
  getProject,
  updateProject,
  deleteProject

} from "../controllers/projectController.js";

import authenticateUser from "../middlewares/authMiddleware.js";
import  { isProjectMember ,isProjectLead } from "../middlewares/projectMiddleware.js";
import { createTask, getTasks } from "../controllers/taskController.js";
import { sendInvitation } from "../controllers/invitationController.js";

const router = express.Router();

router.post("/", authenticateUser, createProject);

router.get("/", authenticateUser,  getMyProjects);

router.get("/:projectId",authenticateUser, isProjectMember  ,getProject);

router.put("/:projectId",authenticateUser,isProjectLead,updateProject)

router.delete("/:projectId",authenticateUser,isProjectLead,deleteProject)

router.post("/:projectId/task" , authenticateUser, isProjectLead , createTask )

router.get("/:projectId/tasks" , authenticateUser, isProjectMember, getTasks  )

router.post("/:projectId/invite", authenticateUser , isProjectLead  , sendInvitation);


export default router;
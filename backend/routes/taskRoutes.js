import express from "express";

import {isProjectLead} from "../middlewares/projectMiddleware.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import isTaskProjectLead from "../middlewares/isTaskProjectLead.js";
import isTaskOwnerOrLead from "../middlewares/isTaskOwnerOrLead.js";
import { deleteTask, getMyTasks, getTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authenticateUser, getMyTasks)
router.get("/:taskId" , authenticateUser, getTask )
// router.put("/:taskId", authenticateUser,  isTaskProjectLead, updateTaskStatus )
router.post("/:taskId/update", authenticateUser, isTaskOwnerOrLead,  updateTask )
router.delete("/:taskId", authenticateUser, isTaskProjectLead, deleteTask)


export default router;
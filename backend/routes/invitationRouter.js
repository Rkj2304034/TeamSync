import { updateInvitation ,getInvitations } from "../controllers/invitationController.js";
import express from  "express"
import authenticateUser from "../middlewares/authMiddleware.js";
import {isProjectLead} from "../middlewares/projectMiddleware.js";
import isInvitationReceiver from "../middlewares/invitationMiddleware.js";
const router = express.Router();


router.post("/:id/update", authenticateUser, isInvitationReceiver, updateInvitation)
router.get("/", authenticateUser,  getInvitations)

export default router
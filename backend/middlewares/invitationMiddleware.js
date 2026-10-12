// isInvitationReceiver
import Invitation from "../models/Invitation.js";

const isInvitationReceiver = async (req, res, next) => {
  try {

    const invitation = await Invitation.findById(
      req.params.id
    );

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found"
      });
    }

    if (
      invitation.receiver.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    req.invitation = invitation;

    next();

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default isInvitationReceiver;
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                role: {
                    type: String,
                    enum: ["Lead", "Member"],
                    default: "Member"
                }
            }
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Project", projectSchema);
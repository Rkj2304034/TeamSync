import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js"
import invitationRouter from "./routes/invitationRouter.js"
import taskRouter from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.get("/", (req, res) => {
    res.send("TeamSync API Running");
});

app.use("/api/auth",authRouter)
app.use("/api/project",projectRouter)
app.use("/api/invitation",invitationRouter )
app.use("/api/task",taskRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
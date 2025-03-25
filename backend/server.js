import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

import path from "path";

import { authRouter } from "./routes/authRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { weatherRouter } from "./routes/weatherRoutes.js";
import { quoteRouter } from "./routes/quoteRoutes.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
connectDB();

app.use(cookieParser());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/quote", quoteRouter);

if(process.env.NODE_ENV==="production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

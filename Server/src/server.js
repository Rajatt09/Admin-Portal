import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth_routes.js";
import apiRoutes from "./routes/api_routes.js";
import emailmessageRoutes from "./routes/emailmessage_routes.js";
import mongoconnect from "./utils/dbConnection.js";

mongoconnect();

dotenv.config();

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());

app.use("/auth/v1", authRoutes);
app.use("/api/v1", apiRoutes);
app.use("/api/v1/emailMessage", emailmessageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

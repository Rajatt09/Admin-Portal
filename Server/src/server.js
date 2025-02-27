import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth_routes.js";
import apiRoutes from "./routes/api_routes.js";
import emailmessageRoutes from "./routes/emailmessage_routes.js";
import mongoconnect from "./utils/dbConnection.js";
import eventRoutes from "./routes/event_routes.js";
import connectDB from "./utils/events.js";
import whatsappMessageRoutes from "./routes/whatsapp_message_routes.js";

mongoconnect();
connectDB();

dotenv.config();

const app = express();
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);
app.use(express.json());

app.use("/auth/v1", authRoutes);
app.use("/api/v1", apiRoutes);
app.use("/events/v1", eventRoutes);
app.use("/api/v1/emailMessage", emailmessageRoutes);
app.use("/api/v1/whatsappMessage", whatsappMessageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

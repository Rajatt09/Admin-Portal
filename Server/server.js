import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth_routes.js";
import apiRoutes from "./src/routes/api_routes.js";
import emailmessageRoutes from "./src/routes/emailmessage_routes.js";
import mongoconnect from "./src/utils/dbConnection.js";
import eventRoutes from "./src/routes/event_routes.js";
import connectDB from "./src/utils/events.js";
import whatsappMessageRoutes from "./src/routes/whatsapp_message_routes.js";
import opticaformsRoutes from "./src/routes/opticaforms_routes.js";

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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", apiRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/emailMessage", emailmessageRoutes);
app.use("/api/v1/whatsappMessage", whatsappMessageRoutes);
app.use("/api/v1/opticaforms", opticaformsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

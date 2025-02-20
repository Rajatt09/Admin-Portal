import express from "express";
import {
	sendMail,
	emailProgress,
} from "../controllers/emailmessage_controller.js";
import upload from "../middleware/multer.js";

import User from "../Models/userModel.js";
const router = express.Router();

router.post("/", upload.single("file"), sendMail);
router.get("/progress", emailProgress);

router.get("/history/all", async (req, res) => {
	try {
		const history = await User.find({}).sort({ createdAt: -1 });
		res.status(200).json(history);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch history" });
	}
});

export default router;


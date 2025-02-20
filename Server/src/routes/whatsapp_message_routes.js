import express from "express";
import sendWhatsappMessage, {
	whatsappProgress,
} from "../controllers/whatsapp_controller.js"; // Add `.js` extension

const router = express.Router();

router.post("/sendWhatsapp", sendWhatsappMessage);
router.get("/progress", whatsappProgress);

export default router;

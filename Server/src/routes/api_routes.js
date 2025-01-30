import express from "express";
import uploadExcel from "../controllers/api_controller.js";
import upload from "../middleware/multer.js";

const route = express.Router();

route.post(
	"/upload/excelFile",
	upload.single("usersExcelFile"),
	async (req, res) => {
		uploadExcel(req, res);
	}
);

export default route;

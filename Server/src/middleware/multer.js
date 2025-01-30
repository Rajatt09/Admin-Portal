import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = "./public/uploads";
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

export default upload;

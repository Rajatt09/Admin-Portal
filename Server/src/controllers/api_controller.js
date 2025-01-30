import path from "path";
import fs from "fs";
import XLSX from "xlsx";

const uploadExcel = async (req, res) => {
	try {
		const file = req.file;

		if (!file) {
			return res.status(400).json({ error: "No file uploaded." });
		}

		const filePath = file.path;
		console.log("Uploaded file path:", filePath);
		// Use multer's saved path

		// Read the Excel file from disk
		let workbook;
		try {
			workbook = XLSX.readFile(filePath);
		} catch (err) {
			console.error("Error reading Excel file:", err);
			return res
				.status(400)
				.json({ error: "Invalid Excel file format." });
		}

		const sheetName = workbook.SheetNames[0]; // Get the first sheet
		const worksheet = workbook.Sheets[sheetName];

		// Convert the worksheet to JSON with header row as keys
		const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		// Extract headers from the first row
		const headers = excelData[0];
		if (!headers || headers.length === 0) {
			return res
				.status(400)
				.json({ error: "No headers found in the Excel file." });
		}

		// Map the data to the desired JSON format using headers as keys
		const users = excelData.slice(1).map((row) => {
			const user = {};
			headers.forEach((header, index) => {
				user[header] = row[index] || "";
			});
			return user;
		});

		// Convert the JSON data to a JS format and write to users.js
		const usersJSContent = `const users = ${JSON.stringify(
			users,
			null,
			2
		)};\n\nexport default users;`;

		// Write to users.js
		const usersJSPath = path.join(
			process.cwd(),
			"src",
			"utils",
			"users.js"
		);
		try {
			fs.mkdirSync(path.dirname(usersJSPath), { recursive: true });
			fs.writeFileSync(usersJSPath, usersJSContent, "utf8");
		} catch (err) {
			console.error("Error writing users.js file:", err);
			return res
				.status(500)
				.json({ error: "Failed to write users.js file." });
		}

		// Clean up uploaded file

		res.status(200).json({
			message: "File processed successfully.",
			users,
		});
	} catch (error) {
		console.error("Error while processing the Excel file:", error);
		res.status(500).json({ error: "Error processing file." });
	}
};

export default uploadExcel;

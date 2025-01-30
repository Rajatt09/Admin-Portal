import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import users from "../src/utils/users.js"; // Ensure this path is correct
import Student from "../Models/userModel.js";
import { EventEmitter } from "events";

const emailEmitter = new EventEmitter();

const emailProgress = async (req, res) => {
	// Set correct headers for SSE
	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
		"Access-Control-Allow-Origin": "*", // Adjust based on your CORS needs
	});

	// Send initial connection confirmation
	res.write('data: {"type":"connected"}\n\n');

	// Keep connection alive with periodic heartbeat
	const heartbeat = setInterval(() => {
		res.write(":\n\n"); // SSE comment for keepalive
	}, 30000);

	// Define progress handler
	const progressHandler = (data) => {
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	};

	// Attach event listener
	emailEmitter.on("progress", progressHandler);

	// Clean up on client disconnect
	req.on("close", () => {
		clearInterval(heartbeat);
		emailEmitter.removeListener("progress", progressHandler);
	});
};
const replaceMailPlaceholders = (template, user) => {
	return template.replace(/{(\w+)}/g, (match, p1) => {
		// Check if user object has the property p1
		if (user.hasOwnProperty(p1)) {
			return user[p1]; // Replace with the user's property value
		} else {
			return match; // If property doesn't exist, return the original placeholder
		}
	});
};

function formatMessage(plainText) {
	let formattedText = plainText.replace(/\n/g, "<br>");
	formattedText = formattedText.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
	formattedText = formattedText.replace(/_(.*?)_/g, "<em>$1</em>");
	return formattedText;
}

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ID,
		pass: process.env.APP_PASSWORD,
	},
});

transporter.use(
	"compile",
	hbs({
		viewEngine: {
			extName: ".handlebars",
			partialsDir: path.resolve("./templates"),
			defaultLayout: false,
		},
		viewPath: path.resolve("./templates"),
		extName: ".handlebars",
	})
);

const sendMail = async (req, res) => {
	const eventDetail = JSON.parse(req.body.eventDetail);
	const mailMessage = JSON.parse(req.body.mailMessage);

	console.log("eventDetail:", eventDetail);
	console.log("mailMessage:", mailMessage);

	// extract the file data from the request
	const fileData = req.file;
	console.log("fileData:", fileData);

	// Check for required fields
	if (!eventDetail || !mailMessage) {
		return res.status(400).json({
			message: "Missing eventdetail or mailMessage in the request.",
		});
	}

	const failedEmails = [];
	try {
		for (const user of users) {
			const mailOptions = {
				from: process.env.EMAIL_ID,
				to: user.Email,
				subject: mailMessage.subject,
				template: "email",
				context: {
					title: eventDetail.name,
					eventDate: eventDetail.date,
					message: mailMessage.message,
					person1: mailMessage.person1,
					person2: mailMessage.person2,
				},
				attachments: fileData
					? [{ filename: fileData.originalname, path: fileData.path }]
					: [],
			};

			try {
				await transporter.sendMail(mailOptions);
				console.log(`✅ Email successfully sent to: ${user.Email}`);

				emailEmitter.emit("progress", {
					type: "progress",
					status: "success",
					email: user.Email,
					message: "Email sent successfully",
				});

				// Save user data in the database
				const newStudent = new Student({
					name: user.Name,
					email: user.Email,
					phoneNo: user.phoneNo,
					emailSend: true,
					whatsappSend: false,
					emailSentAt: Date.now(),
					whatsappSentAt: null,
					eventName: eventDetail.name,
					eventDate: eventDetail.date,
				});
				await newStudent.save();
			} catch (emailError) {
				console.error(
					`Failed to send email to ${user.Email}:`,
					emailError
				);
				failedEmails.push(user.Email);
				emailEmitter.emit("progress", {
					type: "progress",
					status: "error",
					email: user.Email,
					message: "Failed to send email",
				});
			}
		}
		emailEmitter.emit("progress", {
			type: "complete",
		});

		// Notify about success or failures
		if (failedEmails.length > 0) {
			return res.status(207).json({
				message: "Emails processed with some failures.",
				failedEmails,
			});
		}
		console.log("✅ All emails sent successfully.");
		return res
			.status(200)
			.json({ message: "All emails sent successfully." });
	} catch (error) {
		console.error("Error sending emails:", error);
		return res
			.status(500)
			.json({ message: "Error sending emails.", error });
	}
};

export { sendMail, emailProgress };

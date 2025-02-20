// // import users from "../utils/users.js";
// // import { sleep } from "../utils/sleep.js";
// // import WhatsappWeb from "whatsapp-web.js";
// // import student from "../Models/userModel.js";

// // let whatsappmsg = "";
// // let eventdetails = {};

// // const replaceWhatsappPlaceholders = (template, user) => {
// //   return template.replace(/{(\w+)}/g, (match, p1) => {
// //     // Check if user object has the property p1
// //     if (user.hasOwnProperty(p1)) {
// //       return user[p1]; // Replace with the user's property value
// //     } else {
// //       return match; // If property doesn't exist, return the original placeholder
// //     }
// //   });
// // };

// // const sendMessage = async (client, res) => {
// //   console.log("Sending messages, opening WhatsApp...");
// //   try {
// //     for (const user of users) {
// //       if (!user || !user.phoneNo || !user.Name) continue;
// //       const phone = parseInt("+91" + user.phoneNo);
// //       const name = user.Name.toUpperCase().trim();

// //       const message = replaceWhatsappPlaceholders(whatsappmsg, user);

// //       console.log("Sending message to :: ", phone);
// //       res.write(
// //         `data: ${JSON.stringify({
// //           name: user.Name,
// //           phoneNo: user.phoneNo,
// //           email: user.Email,
// //           messageSent: "sending",
// //         })}\n\n`
// //       );
// //       try {
// //         await client.sendMessage(`${phone}@c.us`, message);

// //         res.write(
// //           `data: ${JSON.stringify({
// //             phoneNo: user.phoneNo,
// //             messageSent: "yes",
// //           })}\n\n`
// //         );
// //       } catch (error) {
// //         console.log(`ERR [${phone}] :: `, error.message);
// //         res.write(
// //           `data: ${JSON.stringify({
// //             phoneNo: user.phoneNo,
// //             messageSent: "no",
// //           })}\n\n`
// //         );
// //       }
// //       // save the data in database
// //       try {
// //         console.log("event data is: ", eventdetails);
// //         const newStudent = new student({
// //           name: user.Name,
// //           email: user.Email || "not available",
// //           phoneNo: user.phoneNo,
// //           emailSend: false,
// //           whatsappSend: true,
// //           emailSentAt: null,
// //           whatsappSentAt: Date.now(),
// //           eventName: eventdetails.eventname,
// //           eventDate: eventdetails.eventdate,
// //         });
// //         await newStudent.save();
// //       } catch (err) {
// //         console.log(err);
// //       }

// //       console.log("Sleeping for 1 second");
// //       await sleep(1);
// //     }
// //   } catch (error) {
// //     console.log("Error sending message:", error.message);
// //     res.write(
// //       `data: ${JSON.stringify({
// //         message: "Error in sending whatsapp messages.",
// //         error: error.message,
// //       })}\n\n`
// //     );
// //     throw error;
// //   } finally {
// //     console.log("All messages sent. Closing WhatsApp client.");
// //     res.write('data: {"message": "All messages processed."}\n\n');
// //     // await client.destroy();
// //   }
// // };

// // // const checkAuth = async () => {
// // //   return new Promise((resolve) => {
// // //     const client = new WhatsappWeb.Client({
// // //       authStrategy: new WhatsappWeb.LocalAuth(),
// // //       puppeteer: { headless: true }, // Show the browser window
// // //     });

// // //     client.on('ready', async () => {
// // //       console.log("WhatsApp client authenticated.");
// // //       await client.destroy();
// // //       resolve(true);
// // //     });

// // //     client.on('auth_failure', async (msg) => {
// // //       console.error("Authentication failure:", msg);
// // //       await client.destroy();
// // //       resolve(false);
// // //     });

// // //     client.initialize();
// // //   });
// // // };

// // const InitializeWhatsappClient = async (res) => {
// //   try {
// //     console.log("Initializing WhatsApp client...");
// //     // const isAuthenticated = await checkAuth();
// //     // console.log("isAuthenticated :: ", isAuthenticated);
// //     const client = new WhatsappWeb.Client({
// //       authStrategy: new WhatsappWeb.LocalAuth(),
// //       puppeteer: { headless: false }, // Set to true if authenticated
// //       webVersion: "2.2409.2",
// //       webVersionCache: {
// //         type: "remote",
// //         remotePath:
// //           "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html",
// //       },
// //     });

// //     client.on("qr", (qr) => {
// //       console.log("Login required, please scan the QR code:");
// //       console.log(qr); // You might want to generate a QR code image here
// //     });

// //     client.on("ready", async () => {
// //       console.log("WhatsApp client is ready. Starting to send messages...");
// //       await sendMessage(client, res);
// //       // plz don;t make whole api clos i want this route of api close
// //       res.end();
// //       // process.exit(0);
// //     });

// //     await client.initialize();

// //     // i want not to disclose the whatsapp web screen
// //   } catch (error) {
// //     console.log("Error initializing WhatsApp client:", error.message);
// //     throw error;
// //   }
// // };

// // const setWhatsappMessage = async (req, res) => {
// //   const { eventdetail, whatsappMessage } = req.body;
// //   console.log("event detail and msg is:", eventdetail, whatsappMessage);
// //   whatsappmsg = whatsappMessage;
// //   eventdetails = eventdetail;
// //   try {
// //     res.status(200).json({
// //       message: "whatsapp data send succesfully.",
// //     });
// //   } catch (err) {
// //     console.error("Error while receiving whatsapp data: ", err);
// //     res.status(500).json({
// //       message: "Internal server error while receiving whatsapp data.",
// //     });
// //   }
// // };

// // export default InitializeWhatsappClient;
// // export { setWhatsappMessage };

// import WhatsappWeb from "whatsapp-web.js";

// import User from "../Models/userModel.js";
// import users from "../src/utils/users.js";

// // Global client instance
// let client = null;

// const formatPhoneNumber = (phoneNo) => {
// 	const cleaned = phoneNo.replace(/\D/g, "");
// 	return cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
// };

// const parseMessage = (message, userData = {}) => {
// 	try {
// 		const sanitizedData = Object.fromEntries(
// 			Object.entries(userData).map(([key, value]) => [key, value || ""])
// 		);

// 		let parsedMessage = message.replace(/\{(\w+)\}/g, (match, key) => {
// 			return sanitizedData[key] || match;
// 		});

// 		return parsedMessage
// 			.replace(/\*(.*?)\*/g, "*$1*")
// 			.replace(/_(.*?)_/g, "_$1_")
// 			.replace(/~(.*?)~/g, "~$1~")
// 			.replace(/\n/g, "\n");
// 	} catch (error) {
// 		console.error("Error parsing message:", error);
// 		return message;
// 	}
// };

// const InitializeWhatsappClient = async (res) => {
// 	try {
// 		console.log("Initializing WhatsApp client...");
// 		// const isAuthenticated = await checkAuth();
// 		// console.log("isAuthenticated :: ", isAuthenticated);
// 		const client = new WhatsappWeb.Client({
// 			authStrategy: new WhatsappWeb.LocalAuth(),
// 			puppeteer: { headless: false }, // Set to true if authenticated
// 			webVersion: "2.2409.2",
// 			webVersionCache: {
// 				type: "remote",
// 				remotePath:
// 					"https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html",
// 			},
// 		});

// 		client.on("qr", (qr) => {
// 			console.log("Login required, please scan the QR code:");
// 			console.log(qr); // You might want to generate a QR code image here
// 		});

// 		client.on("ready", async () => {
// 			console.log(
// 				"WhatsApp client is ready. Starting to send messages..."
// 			);
// 			await sendMessage(client, res);
// 			// plz don;t make whole api clos i want this route of api close
// 			res.end();
// 			// process.exit(0);
// 		});

// 		await client.initialize();

// 		// i want not to disclose the whatsapp web screen
// 	} catch (error) {
// 		console.log("Error initializing WhatsApp client:", error.message);
// 		throw error;
// 	}
// };

// const sendMessage = async (client, user, message) => {
// 	try {
// 		if (!user || !user.phoneNo) {
// 			throw new Error("Invalid user data");
// 		}

// 		const formattedPhone = formatPhoneNumber(user.phoneNo);
// 		const chatId = `${formattedPhone}@c.us`;

// 		// Create personalized message first
// 		const personalizedMessage = parseMessage(message, {
// 			name: user.Name || user.name, // Handle both cases
// 			eventName: user.eventName,
// 			eventDate: user.eventDate,
// 		});

// 		// Send message directly without checking registration
// 		await client.sendMessage(chatId, personalizedMessage);

// 		// Update database
// 		await User.findOneAndUpdate(
// 			{ phoneNo: user.phoneNo },
// 			{
// 				name: user.Name || user.name,
// 				email: user.Email || user.email,
// 				phoneNo: user.phoneNo,
// 				whatsappSend: true,
// 				whatsappSentAt: new Date(),
// 			},
// 			{ upsert: true, new: true }
// 		);

// 		return {
// 			success: true,
// 			name: user.Name || user.name,
// 			phoneNo: user.phoneNo,
// 			message: personalizedMessage,
// 		};
// 	} catch (error) {
// 		console.error(
// 			`Failed to send message to ${user.Name || user.name}:`,
// 			error
// 		);
// 		return {
// 			success: false,
// 			name: user.Name || user.name,
// 			phoneNo: user.phoneNo,
// 			error: error.message,
// 		};
// 	}
// };

// const sendWhatsappMessage = async (req, res) => {
// 	try {
// 		const { message, eventDetail } = req.body;

// 		if (!message) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Message is required",
// 			});
// 		}

// 		// Initialize client
// 		const whatsappClient = await InitializeWhatsappClient();

// 		// Ensure client is initialized
// 		if (!whatsappClient) {
// 			throw new Error("Failed to initialize WhatsApp client");
// 		}

// 		console.log("Starting to send messages to users:", users.length);

// 		// Send messages with delay
// 		const results = [];
// 		for (const user of users) {
// 			const result = await sendMessage(whatsappClient, user, message);
// 			results.push(result);
// 			// Delay between messages
// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 		}

// 		const successful = results.filter((r) => r.success).length;
// 		const failed = results.filter((r) => !r.success).length;

// 		return res.status(200).json({
// 			success: true,
// 			message: `Messages processed: ${successful} successful, ${failed} failed`,
// 			data: {
// 				results,
// 				eventDetail,
// 			},
// 		});
// 	} catch (error) {
// 		console.error("Error in sendWhatsappMessage:", error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Failed to send WhatsApp messages",
// 			error: error.message,
// 		});
// 	}
// };

// export default sendWhatsappMessage;

import WhatsappWeb from "whatsapp-web.js";
import User from "../Models/userModel.js";
import users from "../src/utils/users.js";
import { EventEmitter } from "events";

let client = null;
let clients = []; // Store active SSE clients
const whatsappEmitter = new EventEmitter();

const formatPhoneNumber = (phoneNo) => {
	const cleaned = phoneNo.replace(/\D/g, "");
	return cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
};

const parseMessage = (message, userData = {}) => {
	try {
		const sanitizedData = Object.fromEntries(
			Object.entries(userData).map(([key, value]) => [key, value || ""])
		);

		return message.replace(
			/\{(\w+)\}/g,
			(match, key) => sanitizedData[key] || match
		);
	} catch (error) {
		console.error("Error parsing message:", error);
		return message;
	}
};

const InitializeWhatsappClient = async () => {
	try {
		console.log("Initializing WhatsApp client...");

		client = new WhatsappWeb.Client({
			authStrategy: new WhatsappWeb.LocalAuth(),
			puppeteer: {
				headless: false,
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
			},
			webVersionCache: {
				type: "remote",
				remotePath:
					"https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html",
			},
		});

		return new Promise((resolve, reject) => {
			client.on("qr", (qr) => {
				console.log("Scan the QR code to authenticate:", qr);
			});

			client.on("ready", async () => {
				console.log("WhatsApp client is ready!");
				resolve(client);
			});

			client.on("auth_failure", (msg) => {
				console.error("Authentication failure:", msg);
				reject(new Error("Authentication failed"));
			});

			client.on("disconnected", async (reason) => {
				console.error("WhatsApp disconnected:", reason);
				console.log("Restarting WhatsApp client...");

				// Re-initialize the client after a short delay
				await new Promise((resolve) => setTimeout(resolve, 5000));
				InitializeWhatsappClient();
			});

			client.initialize();
		});
	} catch (error) {
		console.error("Error initializing WhatsApp client:", error.message);
		throw error;
	}
};
export const whatsappProgress = (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
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
	whatsappEmitter.on("progress", progressHandler);

	// Clean up on client disconnect
	req.on("close", () => {
		clearInterval(heartbeat);
		whatsappEmitter.removeListener("progress", progressHandler);
	});
};

// Send WhatsApp Message
const sendMessage = async (user, message, eventDetail) => {
	try {
		if (!client) throw new Error("WhatsApp client is not initialized");
		if (!user || !user.phoneNo) throw new Error("Invalid user data");

		const formattedPhone = formatPhoneNumber(user.phoneNo);
		const chatId = `${formattedPhone}@c.us`;
		const personalizedMessage = parseMessage(message, {
			name: user.Name || user.name,
			eventName: eventDetail.name,
			eventDate: eventDetail.date,
		});

		const sentMsg = await client.sendMessage(chatId, personalizedMessage);
		if (!sentMsg) throw new Error("Message failed to send");

		// Save user data after message delivery
		const newStudent = new User({
			name: user.Name,
			email: user.Email || "not available",
			phoneNo: user.phoneNo,
			emailSend: false,
			whatsappSend: true,
			emailSentAt: null,
			whatsappSentAt: new Date(),
			eventName: eventDetail.name,
			eventDate: eventDetail.date,
		});
		await newStudent.save();

		whatsappEmitter.emit("progress", {
			type: "progress",
			phone: user.phoneNo,
			status: "success",
			message: "Message sent",
		});

		return {
			type: "progress",
			phone: user.phoneNo,
			status: "success",
			message: "Message sent",
		};
	} catch (error) {
		whatsappEmitter.emit("progress", {
			type: "progress",
			phone: user.phoneNo,
			status: "failed",
			message: error.message,
		});

		return {
			type: "progress",
			phone: user.phoneNo,
			status: "failed",
			message: error.message,
		};
	}
};

// Handle Sending Messages
export const sendWhatsappMessage = async (req, res) => {
	try {
		const { message, eventDetail } = req.body;

		if (!message) {
			return res
				.status(400)
				.json({ success: false, message: "Message is required" });
		}

		if (!client) client = await InitializeWhatsappClient();

		console.log("Sending messages to users:", users.length);
		const results = [];

		for (const user of users) {
			const result = await sendMessage(user, message, eventDetail);
			results.push(result);
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}
		whatsappEmitter.emit("progress", { type: "complete" });

		const successful = results.filter((r) => r.status === "success").length;
		const failed = results.filter((r) => r.status === "failed").length;

		return res.status(200).json({
			success: true,
			message: `Messages processed: ${successful} successful, ${failed} failed`,
			data: { results, eventDetail },
		});
	} catch (error) {
		console.error("Error in sendWhatsappMessage:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to send WhatsApp messages",
			error: error.message,
		});
	}
};

export default sendWhatsappMessage;

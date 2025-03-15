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

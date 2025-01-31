import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-hot-toast";
import WhatsAppProgressTracker from "./WhatsAppProgressTracker";

const WhatsAppMessage = () => {
	const [excelFile, setExcelFile] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const [eventDetail, setEventDetail] = useState({
		name: "",
		date: "",
	});
	const [showError, setShowError] = useState({
		eventDetail: {
			eventname: "",
			eventdate: "",
		},
	});
	const [message, setMessage] = useState("");

	const handleSendMessage = async () => {
		setShowModal(true);
		if (!message.trim()) {
			toast.error("Please write a message before sending");
			return;
		}

		if (!eventDetail.name.trim()) {
			setShowError((prev) => ({
				...prev,
				eventDetail: {
					...prev.eventDetail,
					eventname: "Event name is required",
				},
			}));
			return;
		}

		if (!eventDetail.date.trim()) {
			setShowError((prev) => ({
				...prev,
				eventDetail: {
					...prev.eventDetail,
					eventdate: "Event date is required",
				},
			}));
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:3000/api/v1/whatsappMessage/sendWhatsapp",
				{
					eventDetail,
					message,
				}
			);

			if (response.data.success) {
				toast.success("Messages sent successfully!");
				setMessage("");
				setEventDetail({ name: "", date: "" });
			} else {
				toast.error(response.data.message || "Failed to send messages");
			}
		} catch (error) {
			console.error("Failed to send messages:", error);
			toast.error(
				error.response?.data?.message || "Failed to send messages"
			);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileType = file.name.split(".").pop().toLowerCase();
			if (["xlsx", "xls", "csv"].includes(fileType)) {
				setExcelFile(file);
				toast.success("Excel file selected successfully");
			} else {
				toast.error("Please select only Excel or CSV files");
			}
		}
	};

	const uploadFile = async () => {
		if (!excelFile) {
			toast.error("Please select a file to upload");
			return;
		}

		const formData = new FormData();
		formData.append("usersExcelFile", excelFile);

		try {
			const response = await axios.post(
				"http://localhost:3000/api/v1/upload/excelFile",
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			console.log("Upload response:", response.data);
			toast.success("File uploaded successfully.");
		} catch (error) {
			console.error(
				"Failed to upload file:",
				error.response?.data || error.message
			);
			toast.error("Failed to upload file.");
		}
	};

	return (
		<>
			<div className="flex ">
				{/* Side Navbar */}
				<Navbar />
				<div className="flex flex-col gap-6 p-6 w-full ml-[120px]">
					<h2 className="text-center font-bold text-4xl">
						WhatsApp Messaging
					</h2>
					<div className="w-full flex flex-row gap-12 bg-white shadow-md rounded-lg p-6">
						{/* Event Details Section */}
						<div className="w-full bg-white shadow-md rounded-lg p-6">
							<h3 className="text-lg font-bold text-gray-800 mb-2">
								Event Details{" "}
								<span className="text-red-500">*</span>
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								<strong>
									(Event details required only while sending
									messages)
								</strong>
							</p>
							<form>
								<div className="mb-4">
									<label
										htmlFor="eventName"
										className="block px-1 py-2 text-sm font-medium text-gray-700"
									>
										Event Name
									</label>
									<input
										id="eventName"
										type="text"
										placeholder="Enter event name"
										value={eventDetail.name}
										onChange={(e) =>
											setEventDetail((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400"
									/>
									{showError.eventDetail.eventname && (
										<p className="text-sm text-red-500 mt-1">
											{showError.eventDetail.eventname}
										</p>
									)}
								</div>
								<div className="mb-8">
									<label
										htmlFor="eventTime"
										className="block px-1 py-2 text-sm font-medium text-gray-700"
									>
										Event Time
									</label>
									<input
										id="eventTime"
										type="text"
										placeholder="Enter event time"
										value={eventDetail.date}
										onChange={(e) =>
											setEventDetail((prev) => ({
												...prev,
												date: e.target.value,
											}))
										}
										className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400"
									/>
									{showError.eventDetail.eventdate && (
										<p className="text-sm text-red-500 mt-1">
											{showError.eventDetail.eventdate}
										</p>
									)}
								</div>
							</form>
						</div>

						{/* Upload Excel Section */}

						<div className="w-full bg-white shadow-md rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4">
								Upload Excel File
							</h3>
							<div className="border-dashed border-2 border-blue-400 p-6 text-center rounded-lg bg-blue-50">
								{/* Trigger the file input via button */}
								<button
									type="button"
									onClick={() =>
										document
											.getElementById("file-upload")
											.click()
									}
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
								>
									Browse files
								</button>
								<input
									type="file"
									id="file-upload"
									className="hidden"
									onChange={handleFileChange}
									accept=".xlsx, .xls, .csv"
								/>
							</div>

							<div className="flex items-center justify-center mt-6">
								{/* Upload button */}
								<button
									onClick={uploadFile}
									className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
								>
									Upload File
								</button>
							</div>

							<p className="mt-4 text-gray-600 text-sm">
								<strong>Note:</strong> Upload file only in Excel
								format.
							</p>
						</div>
					</div>

					{/* Send Message Section */}
					<div className="w-full bg-white shadow-md rounded-lg p-6 mt-6">
						<h3 className="text-lg font-bold text-gray-800 mb-2">
							Write WhatsApp Message{" "}
							<span className="text-red-500">*</span>
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							<strong>
								(Required only while sending WhatsApp messages)
							</strong>
						</p>

						<div className="mb-4">
							<label
								htmlFor="whatsappMessage"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								WhatsApp Message
							</label>
							<textarea
								id="whatsappMessage"
								placeholder="Write your WhatsApp message"
								className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 resize-none"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">
								Formatting Instructions:
							</h4>
							<ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
								<li>
									<span className="font-medium">Bold:</span>{" "}
									Enclose text with * (e.g., *bold text*)
								</li>
								<li>
									<span className="font-medium">Italic:</span>{" "}
									Enclose text with _ (e.g., _italic text_)
								</li>
								<li>
									<span className="font-medium">
										Strikethrough:
									</span>{" "}
									Enclose text with ~ (e.g., ~strikethrough
									text~)
								</li>
								<li>
									<span className="font-medium">
										New Lines:
									</span>{" "}
									Press Enter to add a new line
								</li>
							</ul>
						</div>

						<div className="mt-6 flex justify-end">
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
								onClick={handleSendMessage}
							>
								Send Messages
							</button>
						</div>
					</div>
				</div>
			</div>
			<WhatsAppProgressTracker
				isVisible={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
};

export default WhatsAppMessage;

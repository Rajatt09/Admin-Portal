import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-hot-toast";
const EmailMessage = () => {
	const [excelFile, setExcelFile] = useState(null);
	const [eventDetail, setEventDetail] = useState({
		name: "",
		date: "",
	});
	const [mailMessage, setmailMessage] = useState({
		subject: "",
		message: "",
		person1: {
			name: "",
			phone: "",
		},
		person2: {
			name: "",
			phone: "",
		},
		fileData: "",
	});
	const [showError, setShowError] = useState({
		message: "",
		mail: {
			subject: "",
			message: "",
		},
		uploadfile: "",
		eventDetail: {
			eventname: "",
			eventdate: "",
		},
	});
	const handleMailFileChange = (e) => {
		const file = e.target.files[0];
		setmailMessage({ ...mailMessage, fileData: file });
		toast.success("File selected successfully");
	};
	const handlePersonChange = (person, field, value) => {
		setmailMessage({
			...mailMessage,
			[person]: { ...mailMessage[person], [field]: value },
		});
	};
	const sendingData = async () => {
		// setLoading(true);
		setShowError({
			message: "",
			mail: {
				subject: "",
				message: "",
			},
			uploadfile: "",
			eventDetail: {
				eventname: "",
				eventdate: "",
			},
		});

		if (eventDetail.name == "") {
			toast.error("Please fill the event name.");
			setShowError((prevData) => ({
				...prevData,
				eventdetail: {
					...prevData.eventDetail,
					eventname: "Please fill the event name.",
				},
			}));

			return;
		} else if (eventDetail.date == "") {
			toast.error("Please fill the event time.");
			setShowError((prevData) => ({
				...prevData,
				eventdetail: {
					...prevData.eventDetail,
					eventdate: "Please fill the event time.",
				},
			}));
			return;
		}

		if (mailMessage.subject == "") {
			toast.error("Please provide subject.");
			setShowError((prevData) => ({
				...prevData,
				mail: {
					...prevData.mail,
					subject: "Please provide subject.",
				},
			}));

			return;
		} else if (mailMessage.message == "") {
			toast.error("Please provide message.");
			setShowError((prevData) => ({
				...prevData,
				mail: {
					...prevData.mail,
					message: "Please provide message.",
				},
			}));
			return;
		}
		// after clicking on send data button

		console.log("Data to be sent:", {
			eventDetail,
			mailMessage,
			excelFile,
		});

		toast.success("Email sent successfully");
			// if there is no error and data send sucessfully then empty the fields
			setEventDetail({
				name: "",
				date: "",
			});
			setmailMessage({
				subject: "",
				message: "",
				person1: {
					name: "",
					phone: "",
				},
				person2: {
					name: "",
					phone: "",
				},
	
				fileData: "",
			});
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		console.log("Selected file:", file);
		if (file) {
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
			alert("File uploaded successfully.");
		} catch (error) {
			console.error(
				"Failed to upload file:",
				error.response?.data || error.message
			);
			alert("Failed to upload file.");
		}
	};

	return (
		<>
			<div className="flex ">
				{/* Side Navbar */}
				<Navbar />
				<div className="flex flex-col gap-6 p-6 w-full ml-[120px]">
					<h2 className="text-center font-bold text-4xl">
						Email Messaging
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
									mail and messages)
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
								Upload Excel File{" "}
							</h3>
							<div className="border-dashed border-2 border-blue-400 p-6 text-center rounded-lg bg-blue-50">
								<label
									htmlFor="file-upload"
									className="cursor-pointer text-blue-600 font-medium hover:underline"
								>
									<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
										Browse files
									</button>
								</label>
								<input
									type="file"
									id="file-upload"
									className="hidden"
									onChange={handleFileChange}
									accept=".xlsx, .xls, .csv"
								/>
							</div>

							<div className="flex items-center justify-center mt-6">
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

					{/* Email Section */}
					<div className="w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
						<h3 className="text-lg font-bold text-gray-800 mb-4">
							Write Email Message{" "}
							<span className="text-red-500">*</span>
						</h3>
						<p className="text-sm text-gray-600 mb-6">
							<strong>(Required only while sending mails)</strong>
						</p>
						<form>
							<div className="mb-6">
								<label
									htmlFor="emailSubject"
									className="block px-1 py-2 text-sm font-medium text-gray-700"
								>
									Subject{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									id="emailSubject"
									type="text"
									placeholder="Write email subject"
									value={mailMessage.subject}
									onChange={(e) =>
										setmailMessage((prev) => ({
											...prev,
											subject: e.target.value,
										}))
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
								/>
							</div>

							<div className="mb-6">
								<label
									htmlFor="emailMessage"
									className="block px-1 py-2 text-sm font-medium text-gray-700"
								>
									Email Message{" "}
									<span className="text-red-500">*</span>
								</label>
								<textarea
									id="emailMessage"
									rows="6"
									placeholder="Write your email message"
									value={mailMessage.message}
									onChange={(e) =>
										setmailMessage((prev) => ({
											...prev,
											message: e.target.value,
										}))
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none px-4 py-2"
								/>
							</div>

							{["person1", "person2"].map((personKey, index) => (
								<div className="mb-6" key={index}>
									<label className="block px-1 py-2 text-sm font-medium text-gray-700">
										Contact Person {index + 1} (Optional)
									</label>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<input
											type="text"
											placeholder="Name"
											value={mailMessage[personKey].name}
											onChange={(e) =>
												handlePersonChange(
													personKey,
													"name",
													e.target.value
												)
											}
											className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
										/>
										<input
											type="text"
											placeholder="Phone Number"
											value={mailMessage[personKey].phone}
											onChange={(e) =>
												handlePersonChange(
													personKey,
													"phone",
													e.target.value
												)
											}
											className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2"
										/>
									</div>
								</div>
							))}

							<div className="mb-6">
								<label
									htmlFor="fileUpload"
									className="block px-1 py-2 text-sm font-medium text-gray-700"
								>
									Upload File (Optional)
								</label>
								<div className="border-dashed border-2 border-blue-400 p-8 text-center rounded-lg bg-blue-50">
									<label
										htmlFor="file-upload-mail"
										className="cursor-pointer text-blue-600 font-medium hover:underline"
									>
										<button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
											Browse files
										</button>
									</label>
									<input
										id="file-upload-mail"
										type="file"
										onChange={handleMailFileChange}
										className="hidden"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			
			{/* Send Data Button */}
			<div className="flex justify-end mx-10 my-8">
				<button
					onClick={sendingData}
					className="bg-blue-600 hover:bg-blue-700 flex flex-row  text-white px-4 py-2 rounded-md shadow-md"
				>
					Send Data
				</button>
			</div>
		</>
	);
};

export default EmailMessage;

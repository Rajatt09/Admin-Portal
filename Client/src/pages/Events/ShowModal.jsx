import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ShowModal({ closeModal, onSubmit }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    venue: "",
    description: "",
    files: [], // Array to hold multiple files
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Get all selected files
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...selectedFiles], // Append new files to existing array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Uploading files...");
    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("venue", formData.venue);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("timeFrom", formData.timeFrom);
    formDataToSend.append("timeTo", formData.timeTo);

    // Append files to the FormData
    formData.files.forEach((file) => {
      formDataToSend.append("files", file); // "files" is the key for the file array
    });

    try {
      // Use fetch or axios to send data
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/events/eventPost`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss();
      console.log("Files uploaded successfully");
      toast.success("Files uploaded successfully");
      closeModal();
      setTimeout(() => {
        navigate(0);
      }, 2500);
    } catch (error) {
      toast.dismiss();
      toast.error("Error uploading files");
      console.error("Error uploading files:", error);
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index), // Remove file by index
    }));
  };

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(189,189,189,0.9)]"
        onClick={closeModal}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[70vh] overflow-y-auto bg-blue-50 rounded-lg shadow-lg w-[500px] p-6">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-title my-4 text-center">
            <span className="font-bold text-xl">ADD Optica EVENT</span>
          </div>

          <div className="py-2">
            <label
              className="text-base text-black after:content-['*'] after:text-red-400"
              htmlFor="eventName"
            >
              Event Name
            </label>
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 rounded-md"
              placeholder="Event Name"
              type="text"
              id="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="py-2">
            <label
              className="text-base text-black after:content-['*'] after:text-red-400"
              htmlFor="venue"
            >
              Venue
            </label>
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              type="text"
              placeholder="Venue..."
              id="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="py-2">
            <label
              className="text-base text-black after:content-['*'] after:text-red-400"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              type="text"
              placeholder="Description..."
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="py-2">
            <label
              className="text-base text-black after:content-['*'] after:text-red-400"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4 py-2">
            <div className="w-1/2">
              <label
                className="text-base text-black after:content-['*'] after:text-red-400"
                htmlFor="timeFrom"
              >
                From
              </label>
              <input
                className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                type="time"
                id="timeFrom"
                value={formData.timeFrom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-1/2">
              <label
                className="text-base text-black after:content-['*'] after:text-red-400"
                htmlFor="timeTo"
              >
                To
              </label>
              <input
                className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                type="time"
                id="timeTo"
                value={formData.timeTo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="py-2">
            <label
              className="text-base text-black after:content-['*'] after:text-red-400"
              htmlFor="files"
            >
              Upload Files
            </label>
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-md"
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
            {formData.files.length > 0 && (
              <ul className="mt-2">
                {formData.files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-5 py-8">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#295DFA] text-white py-2 text-center font-bold"
            >
              Add
            </button>
            <button
              type="button"
              className="w-full rounded-lg bg-[#295DFA] text-white py-2 text-center font-bold"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ShowModal;

{
  /* <>
			<div
				className="fixed left-0 right-0 top-0 bottom-0 bg-[rgba(189,189,189,0.9)]"
				onClick={closeModal}
			></div>
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F6FAFF] rounded-lg shadow-lg w-[500px] h-[550px] px-6 py-4">
				<form className="form">
					<div className="form-title my-4 text-center">
						<span className="font-bold text-xl text-center my-8">ADD Optica EVENT</span>
					</div>
				
					<div className=" py-2">
						<label
							className="text-base text-black py-8  after:content-['*'] after:text-red-400"
							htmlFor="eventName"
						>
							Event Name{" "}
						</label>
						<br></br>
						<input
							className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2"
							placeholder="Event Name"
							type="eventName"
							required
						/>
						<span> </span>
					</div>
					<div className="input-container py-2">
						<label
							className="text-base text-black after:content-['*'] after:text-red-400"
							htmlFor="date"
						>
							Date
						</label>
						<br></br>
						<input
							className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="date"
							required
						/>
					</div>
					<div className="flex gap-1 py-2 input-container">
						<div className="w-1/2">
							<label
								className="text-base text-black after:content-['*'] after:text-red-400"
								htmlFor="time"
							>
								From
							</label>
							<br></br>
							<input
								className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
								type="time"
								required
							/>
						</div>
						<div className="ml-10 w-1/2">
							<label
								className="text-base text-black after:content-['*'] after:text-red-400"
								htmlFor="time"
							>
								To
							</label>
							<br></br>
							<input
								className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 rounded-xl"
								type="time"
								required
							/>
						</div>
					</div>
					{/* <div>
						<input
							className="text-black w-full p-1 mb-2 mt-5 outline-none ring-none focus:ring-2"
							type="file"
							name="image"
						/>
					</div> */
}
// 			<div className="flex gap-5 px-5 py-8">
// 				<button className="submit w-full rounded-lg bg-[#295DFA] text-white p-2 text-center font-bold">
// 					Add
// 				</button>
// 				<button
// 					className="submit w-full rounded-lg bg-[#295DFA] text-white p-2 text-center font-bold"
// 					onClick={closeModal}
// 				>
// 					Close
// 				</button>
// 			</div>
// 		</form>
// 	</div>
// </> */}

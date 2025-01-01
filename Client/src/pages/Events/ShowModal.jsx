import React from "react";

import { useEffect } from "react";

function ShowModal({ closeModal }) {
	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "scroll";
		};
	}, []);
	return (
		<>
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
					<div>
						<input
							className="text-black w-full p-1 mb-2 mt-5 outline-none ring-none focus:ring-2"
							type="file"
							name="image"
						/>
					</div>
					<div className="flex gap-5 px-5 py-8">
						<button className="submit w-full rounded-lg bg-[#295DFA] text-white p-2 text-center font-bold">
							Add
						</button>
						<button
							className="submit w-full rounded-lg bg-[#295DFA] text-white p-2 text-center font-bold"
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

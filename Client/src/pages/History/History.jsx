import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle2, XCircle } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";

const History = () => {
	const [normalHistory, setNormalHistory] = useState([]);
	const [groupedHistory, setGroupedHistory] = useState({});
	useEffect(() => {
		fetchNormalHistory();
	}, []);
	const fetchNormalHistory = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/v1/emailMessage/history/all"
			);
			setNormalHistory(response.data);
			groupByDate(response.data);
		} catch (error) {
			console.error("Error fetching normal history:", error);
		}
	};
	const groupByDate = (data) => {
		const grouped = data.reduce((acc, item) => {
			const date = new Date(item.createdAt).toLocaleDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(item);
			return acc;
		}, {});
		setGroupedHistory(grouped);
	};
	return (
		<>
			<div className="flex">
				<Navbar />
				<div className="flex-1 px-6 py-8 min-h-screen bg-gray-50">
					<h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
						Message History
					</h2>

					<div className="max-w-6xl mx-auto">
						{Object.keys(groupedHistory).length > 0 ? (
							Object.entries(groupedHistory).map(
								([date, records]) => (
									<div
										key={date}
										className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
									>
										<div className="bg-indigo-100 px-6 py-4">
											<h4 className="text-lg font-semibold text-indigo-700">
												{new Date(
													date
												).toLocaleDateString("en-US", {
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</h4>
										</div>

										<div className="overflow-x-auto">
											<table className="w-full min-w-full border-collapse">
												<thead className="bg-gray-50">
													<tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
														<th className="px-6 py-4">
															Name
														</th>
														<th className="px-6 py-4">
															Email
														</th>
														<th className="px-6 py-4">
															Phone
														</th>
														<th className="px-6 py-4">
															Event
														</th>
														<th className="px-6 py-4 text-center">
															Email Sent
														</th>
														<th className="px-6 py-4 text-center">
															WhatsApp Sent
														</th>
														<th className="px-6 py-4">
															Time
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-gray-200">
													{records.map((item) => (
														<tr
															key={item._id}
															className="hover:bg-gray-50 transition-colors"
														>
															<td className="px-6 py-4 text-gray-800 font-medium">
																{item.name}
															</td>
															<td className="px-6 py-4 text-gray-600">
																{item.email}
															</td>
															<td className="px-6 py-4 text-gray-600">
																{item.phoneNo}
															</td>
															<td className="px-6 py-4 text-gray-600">
																{item.eventName}
															</td>
															<td className="px-6 py-4 text-center">
																{item.emailSend ? (
																	<CheckCircle2 className="text-green-500 inline-block w-5 h-5" />
																) : (
																	<XCircle className="text-red-500 inline-block w-5 h-5" />
																)}
															</td>
															<td className="px-6 py-4 text-center">
																{item.whatsappSend ? (
																	<CheckCircle2 className="text-green-500 inline-block w-5 h-5" />
																) : (
																	<XCircle className="text-red-500 inline-block w-5 h-5" />
																)}
															</td>
															<td className="px-6 py-4 text-gray-500 text-sm">
																{new Date(
																	item.createdAt
																).toLocaleTimeString(
																	"en-US",
																	{
																		hour: "2-digit",
																		minute: "2-digit",
																	}
																)}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								)
							)
						) : (
							<div className="text-center py-12">
								<p className="text-gray-500 text-lg">
									No messages found in history
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default History;

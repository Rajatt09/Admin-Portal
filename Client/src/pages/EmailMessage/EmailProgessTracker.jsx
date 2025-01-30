import { useState, useEffect, useCallback } from "react";
const EmailProgressTracker = ({ isVisible, onClose }) => {
	const [progress, setProgress] = useState([]);
	const [isComplete, setIsComplete] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState("connecting");

	const setupEventSource = useCallback(() => {
		const eventSource = new EventSource(
			"http://localhost:3000/api/v1/emailmessage/progress"
		);

		eventSource.onopen = () => {
			setConnectionStatus("connected");
			console.log("SSE Connection established");
		};

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				console.log("Received SSE data:", data);

				if (data.type === "progress") {
					setProgress((prev) => [
						...prev,
						{
							...data,
							timestamp: new Date().toLocaleTimeString(),
						},
					]);
				} else if (data.type === "complete") {
					setIsComplete(true);
					eventSource.close();
				}
			} catch (error) {
				console.error("Error parsing SSE data:", error);
			}
		};

		eventSource.onerror = (error) => {
			console.error("SSE Connection error:", error);
			setConnectionStatus("error");
			setTimeout(() => {
				if (eventSource.readyState === EventSource.CLOSED) {
					setupEventSource();
				}
			}, 5000);
		};

		return eventSource;
	}, []);

	useEffect(() => {
		let eventSource = null;
		if (isVisible) {
			setProgress([]); 
			setIsComplete(false); 
			eventSource = setupEventSource();
		}
		return () => {
			if (eventSource) {
				eventSource.close();
			}
		};
	}, [isVisible, setupEventSource]);

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg p-6 w-4/5 max-h-[80vh] overflow-hidden flex flex-col">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-semibold">
						Email Progress Tracker
						<span className="text-sm font-normal ml-2 text-gray-600">
							(
							{connectionStatus === "connected"
								? "Connected"
								: "Connecting..."}
							)
						</span>
					</h3>
					{isComplete && (
						<button
							onClick={onClose}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Close
						</button>
					)}
				</div>

				<div className="overflow-auto flex-1">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Time
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Message
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{progress.map((item, index) => (
								<tr key={`${item.email}-${item.timestamp}`}>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{item.timestamp}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{item.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
												item.status === "success"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">
										{item.message}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{isComplete && (
					<div className="mt-4 p-4 bg-green-50 rounded-md">
						<p className="text-green-700 text-center font-medium">
							✓ All emails have been processed successfully!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default EmailProgressTracker;

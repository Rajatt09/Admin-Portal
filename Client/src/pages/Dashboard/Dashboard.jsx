import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/Searchbar/Searchbar";
import { Line, Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  // Data for Line Chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [400, 600, 800, 1200, 1500],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Performance",
        data: [30, 50, 80, 90],
        backgroundColor: ["#6366F1", "#EC4899", "#22C55E", "#F59E0B"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mr-4 mt-1">Dashboard</h1>
            <SearchBar onSearch={(searchTerm) => console.log("Searching for:", searchTerm)} />
          </div>

          {/* Line Graph */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-medium mb-4">Sales Overview</h2>
            <div className="w-full h-64">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Grid Layout for Calendar & Bar Graph */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Bar Graph Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Performance Analysis</h2>
              <div className="w-full h-64">
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Calendar Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Calendar</h2>
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium mb-4 ">Number of WhatsApp Messages sent: </h2>
              <h2 className="text-6xl font-medium mb-4 "> 500+  </h2>
            </div>

            {/* Calendar Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium mb-4">Number of Emails sent: </h2>
              <h2 className="text-6xl font-medium mb-4 "> 250+  </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

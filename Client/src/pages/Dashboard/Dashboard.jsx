import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/Searchbar/Searchbar";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const handleSearch = (searchTerm) => {
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
    console.log("Searching for:", searchTerm);
  };

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
            <SearchBar onSearch={handleSearch} />
          </div>
          {/* Dashboard Components Container */}

          {/* Line Graph - Full Width */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-medium mb-4">Line Graph</h2>
            <div className="w-full">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Grid Layout for Calendar & Bar Graph */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {/* Example Dashboard Component 1 */}
            {/* Bar Graph Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 1</h2>
              {/* Your component content */}
              <h2 className="text-lg font-medium mb-4">Bar Graph</h2>
              <div className="w-full">
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Example Dashboard Component 2 */}
            {/* Calendar Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 2</h2>
              {/* Your component content */}
              <h2 className="text-lg font-medium mb-4">Calendar</h2>
              <Calendar onChange={setDate} value={date} />
            </div>

            {/* Add more components as needed */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 3</h2>
              {/* Your component content */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Component 4</h2>
              {/* Your component content */}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
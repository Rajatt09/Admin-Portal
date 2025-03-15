import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Eye } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Card from "./OpticFormCard.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function OpticaFormsDashboard() {
  const [totalSheets, setTotalSheets] = useState([]);
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/opticaforms/getforms`
        );

        // totalSheets = data;
        if (response.status === 200) {
          setTotalSheets(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching total sheets: ", error);
      }
    };

    fetchSheets();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex- ml-16 w-full">
        {/* Header */}
        <header className="mt-5 flex flex-col sm:flex-row items-center sm:justify-between sm:mr-6 sm:ml-6">
          {/* Title Section */}
          <div className="flex flex-row items-center w-full w-auto ml-8 gap-4 gap-8">
            <h1 className="text-2xl font-sans font-bold">Optica Forms</h1>
            {/* New Form Button on Desktop */}
            <div className="sm:ml-auto sm:flex sm:items-center mr-8">
              <Link to="/create/new-form">
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus size={20} />
                  <span>New Form</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative sm:w-80 mt-4 sm:mt-0 w-full sm:px-0 px-4">
            <div className="relative h-10 border rounded-full px-4 py-2 text-sm focus:outline-2 focus:ring-2 focus:ring-blue-500">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-5" />
              <input
                type="text"
                placeholder="Search Forms..."
                className="w-full pr-10 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
              />
            </div>
          </div>
        </header>

        {/* Forms Content */}
        <main className="py-4 mx-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Cards container for forms */}
            {totalSheets.map((sheet, index) => (
              <Card
                key={index} // Use index as key (ideally a unique ID should be used if available)
                formName={sheet.eventName}
                date={sheet.eventDate}
                day={
                  sheet.eventDate
                    ? new Date(sheet.eventDate).toLocaleDateString("en-US", {
                        weekday: "long",
                      })
                    : "N/A"
                }
                responseCount={sheet.totalEntries}
                sheetLink={sheet.sheetLink}
                formId={sheet.eventId}
              />
            ))}

            <Card
              formName="Event Registration Form"
              date="2025-02-15"
              day="Friday"
              responseCount={35}
            />
            {/* <Card
              formName="Event Registration Form"
              date="2025-02-15"
              day="Friday"
              responseCount={35}
            />
            <Card
              formName="Feedback Form"
              date="2025-02-20"
              day="Wednesday"
              responseCount={20}
            />
            <Card
              formName="Survey Form"
              date="2025-02-25"
              day="Monday"
              responseCount={50}
            /> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default OpticaFormsDashboard;

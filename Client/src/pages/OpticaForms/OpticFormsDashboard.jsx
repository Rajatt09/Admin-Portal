import React, { useState } from "react";
import { Search, Plus, Edit, Eye } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Card from "./OpticFormCard.jsx";
import { Link } from "react-router-dom";

function OpticaFormsDashboard() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex- ml-[100px] w-full">
        {/* Header */}
        <header className="mt-5 flex items-center gap-12 mr-6 ml-6">
          <h1 className="text-2xl font-sans font-bold">Optica Forms</h1>

          {/* Search Bar */}
          <div className="relative">
            <div className="relative h-10 w-80 border rounded-full px-4 py-2 text-sm focus:outline-2 focus:ring-2 focus:ring-blue-500">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Forms..."
                className="w-full pr-10 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
              />
            </div>
          </div>
        </header>

        {/* New Form Button */}
        <div className="flex justify-end mt-7 mr-6">
          <Link to="/createopticaform">
            <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus size={20} />
              <span>Create New Form</span>
            </button>
          </Link>
        </div>

        {/* Forms Content */}
        <main className="py-4 mx-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Cards container for forms */}
            <Card
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
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default OpticaFormsDashboard;

import React from "react";
import { Table } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import { Search } from "lucide-react";

const ResponsesView = () => {
  // This would typically fetch from your Google Sheets API
  const responses = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      timestamp: "2024-03-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      timestamp: "2024-03-14",
    },
  ];

  return (
    <div className="p-6">
      <Navbar />
      <div className="ml-16 flex flex-col">
        {" "}
        {/* Added margin-left to account for the sidebar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Form Responses</h2>
            <div className="relative">
              <div className="relative h-10 w-80 ml-8 border rounded-full px-4 py-2 text-sm focus:outline-2 focus:ring-2 focus:ring-blue-500">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full pr-10 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4 ml-auto">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Table size={20} />
              <span>Export to Excel</span>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map((response) => (
                <tr key={response.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {response.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {response.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {response.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResponsesView;

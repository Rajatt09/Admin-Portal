import React from "react";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function OpticaFormCard({
  formName,
  date,
  day,
  responseCount,
  sheetLink,
  formId,
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-shadow w-full sm:w-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{formName}</h3>
          <p className="text-sm text-gray-500">
            {day}, {date}
          </p>
        </div>
        <div className="text-sm text-gray-600 mt-2 sm:mt-0">
          {responseCount} Responses
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 w-full">
        {/* Action Buttons */}
        <Link to={`/edit/${formId}`}>
          <button className="text-indigo-600 hover:text-indigo-800 flex justify-center items-center space-x-1 p-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 w-full sm:w-auto mb-2 sm:mb-0">
            <Edit size={16} />
            <span>Edit Form</span>
          </button>
        </Link>

        <Link to={sheetLink}>
          <button className="text-green-600 hover:text-green-800 flex justify-center items-center space-x-1 p-2 rounded-lg border border-green-600 hover:bg-green-50 w-full sm:w-auto">
            <Eye size={16} />
            <span>View Responses</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OpticaFormCard;

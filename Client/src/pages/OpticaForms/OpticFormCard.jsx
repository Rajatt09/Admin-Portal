import React from "react";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";

function OpticaFormCard({ formName, date, day, responseCount }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{formName}</h3>
          <p className="text-sm text-gray-500">
            {day}, {date}
          </p>
        </div>
        <div className="text-sm text-gray-600">{responseCount} Responses</div>
      </div>

      <div className="flex justify-between mt-4">
        {/* Action Buttons */}
        <button className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 p-2 rounded-lg border border-indigo-600 hover:bg-indigo-50">
          <Edit size={16} />
          <span>Edit Form</span>
        </button>

        <Link to="/opticaformsresponses">
          <button className="text-green-600 hover:text-green-800 flex items-center space-x-1 p-2 rounded-lg border border-green-600 hover:bg-green-50">
            <Eye size={16} />
            <span>View Responses</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OpticaFormCard;

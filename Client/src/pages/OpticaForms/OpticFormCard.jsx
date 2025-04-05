import React, { useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function OpticaFormCard({
  formName,
  date,
  day,
  responseCount,
  sheetLink,
  formId,
  onDelete,
  sheetName,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      setShowModal(false);
      if (onDelete) onDelete(formId, sheetName);
    } catch (err) {
      console.error("Error deleting form:", err);
      alert("Failed to delete form.");
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-4 hover:shadow-xl transition-shadow w-full sm:max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{formName}</h3>
          <p className="text-sm text-gray-500">
            {day}, {date}
          </p>
        </div>
        <div className="text-sm text-gray-600">{responseCount} Responses</div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2 w-full">
        <Link to={`/edit/${formId}`} className="w-full sm:w-auto">
          <button className="text-indigo-600 hover:text-indigo-800 flex justify-center items-center space-x-1 p-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 w-full">
            <Edit size={16} />
            <span>Edit Form</span>
          </button>
        </Link>

        <Link
          to={sheetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <button className="text-green-600 hover:text-green-800 flex justify-center items-center space-x-1 p-2 rounded-lg border border-green-600 hover:bg-green-50 w-full">
            <Eye size={16} />
            <span>View Responses</span>
          </button>
        </Link>
      </div>

      {/* Open Form + Delete side-by-side */}
      <div className="flex justify-between items-center mt-2">
        <a
          href={`https://www.forms.jiitopticachapter.com/${formId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline"
        >
          Open Form Link
        </a>

        <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-full bg-[#FEE2E2] text-[#DC2626] hover:bg-[#fca5a5] transition-colors"
          title="Delete Form"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-red-600">Confirm Deletion</h2>
            <p className="text-gray-700">
              Are you sure you want to delete the form{" "}
              <strong>{formName}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-[#DC2626] hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpticaFormCard;

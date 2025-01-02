import React, { useState } from "react";
import { Trash2, Plus, X, AlertCircle } from "lucide-react";

const defaultField = {
  heading: "New Field",
  type: "text",
  required: false,
  name: "",
  placeholder: "",
  errorMsg: "",
  labels: [],
  dropdownConfig: [],
  dropdownNames: [],
  allowedFileTypes: [],
};

const FormFieldEditor = ({
  field = defaultField,
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const [showValidation, setShowValidation] = useState(false);

  // Ensure we have a valid field object by merging with defaults
  const currentField = { ...defaultField, ...field };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...currentField, [name]: value });
  };

  const handleLabelsChange = (index, value) => {
    const newLabels = [...(currentField.labels || [])];
    newLabels[index] = value;
    onUpdate({ ...currentField, labels: newLabels });
  };

  const addLabel = () => {
    const newLabels = [...(currentField.labels || []), ""];
    onUpdate({ ...currentField, labels: newLabels });
  };

  const removeLabel = (index) => {
    const newLabels = currentField.labels.filter((_, i) => i !== index);
    onUpdate({ ...currentField, labels: newLabels });
  };

  const handleDropdownConfigChange = (dropdownIndex, optionIndex, value) => {
    if (!currentField.dropdownConfig) return;

    const newConfig = [...currentField.dropdownConfig];
    newConfig[dropdownIndex] = {
      ...newConfig[dropdownIndex],
      options: newConfig[dropdownIndex].options.map((opt, i) =>
        i === optionIndex ? value : opt
      ),
    };
    onUpdate({ ...currentField, dropdownConfig: newConfig });
  };

  const addDropdown = () => {
    const newDropdownConfig = [
      ...(currentField.dropdownConfig || []),
      {
        key: `Preference ${currentField.dropdownConfig?.length + 1}`,
        options: [""],
      },
    ];
    onUpdate({ ...currentField, dropdownConfig: newDropdownConfig });
  };

  const removeDropdown = (index) => {
    const newDropdownConfig = currentField.dropdownConfig.filter(
      (_, i) => i !== index
    );
    onUpdate({ ...currentField, dropdownConfig: newDropdownConfig });
  };

  const addOption = (dropdownIndex) => {
    const newConfig = [...currentField.dropdownConfig];
    newConfig[dropdownIndex].options.push("");
    onUpdate({ ...currentField, dropdownConfig: newConfig });
  };

  const removeOption = (dropdownIndex, optionIndex) => {
    const newConfig = [...currentField.dropdownConfig];
    newConfig[dropdownIndex].options = newConfig[dropdownIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    onUpdate({ ...currentField, dropdownConfig: newConfig });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {currentField.heading}
          </h3>
          {currentField.name && (
            <p className="text-sm text-gray-500">
              Field ID: {currentField.name}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {currentField.errorMsg && (
            <button
              onClick={() => setShowValidation(!showValidation)}
              className="text-gray-600 hover:text-gray-800"
            >
              <AlertCircle size={20} />
            </button>
          )}
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <Trash2 size={20} />
            Delete
          </button>
        </div>
      </div>

      {showValidation && currentField.errorMsg && (
        <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-center space-x-2 text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{currentField.errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Type
          </label>
          <select
            name="type"
            value={currentField.type}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="dropdown">Dropdown</option>
            <option value="file">File</option>
            <option value="textarea">Textarea</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Name
          </label>
          <input
            type="text"
            name="heading"
            value={currentField.heading}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1"
            placeholder="Enter field name"
          />
        </div>

        {(currentField.type === "text" ||
          currentField.type === "email" ||
          currentField.type === "textarea") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              name="placeholder"
              value={currentField.placeholder || ""}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1"
            />
          </div>
        )}

        {(currentField.type === "radio" ||
          currentField.type === "checkbox") && (
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={addLabel}
                className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 mb-3"
              >
                <Plus size={16} />
                <span>Add Option</span>
              </button>
            </div>
            <div className="space-y-2">
              {currentField.labels?.map((label, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => handleLabelsChange(index, e.target.value)}
                    placeholder="write option"
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1"
                  />
                  <button
                    onClick={() => removeLabel(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentField.type === "dropdown" && currentField.dropdownConfig && (
          <div className="col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={addDropdown}
                className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2 p-2 rounded-lg border border-indigo-600 hover:bg-indigo-50"
              >
                <Plus size={16} />
                <span>Add Dropdown</span>
              </button>
            </div>
            {currentField.dropdownConfig.map((config, dropdownIndex) => (
              <div key={dropdownIndex} className="space-y-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-lg font-semibold text-gray-700">
                    Dropdown {dropdownIndex + 1}
                  </label>
                  <button
                    onClick={() => removeDropdown(dropdownIndex)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dropwdown Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-sm"
                    placeholder="Write option"
                  />
                  {config.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Option {optionIndex + 1}
                        </label>
                      </div>
                      <div className="w-3/4">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleDropdownConfigChange(
                              dropdownIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-sm"
                          placeholder="Write option"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addOption(dropdownIndex)}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2 p-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 mt-4"
                >
                  <Plus size={16} />
                  <span>Add Option</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {currentField.type === "file" && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allowed File Types
            </label>
            <input
              type="text"
              name="allowedFileTypes"
              value={currentField.allowedFileTypes?.join(", ") || ""}
              onChange={(e) =>
                onUpdate({
                  ...currentField,
                  allowedFileTypes: e.target.value
                    .split(",")
                    .map((type) => type.trim()),
                })
              }
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. image/png, image/jpeg, application/pdf"
            />
          </div>
        )}

        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentField.required || false}
              onChange={(e) =>
                onUpdate({ ...currentField, required: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Required field
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFieldEditor;

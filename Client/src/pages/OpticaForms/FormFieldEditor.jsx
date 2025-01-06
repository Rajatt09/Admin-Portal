import React from "react";
import { Trash2, Plus, X, ChevronDown, AlertCircle } from "lucide-react";

const defaultField = {
  heading: "New Field",
  type: "text",
  required: false,
  name: "",
  placeholder: "",
  errorMsg: "",
  regex: "",
  labels: [],
  otherKey: "",
  dropdownNames: [],
  dropdownConfig: [],
  allowedFileTypes: [],
};

const FormFieldEditor = ({
  idx,
  field = defaultField,
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const currentField = { ...defaultField, ...field };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...currentField, [name]: value });
  };

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    const formattedKey = `entry.${value.replace(/\s+/g, "_")}`;
    onUpdate({ ...currentField, [name]: value, name: formattedKey });
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
        key: "",
        options: [""],
      },
    ];
    const newDropdownNames = [...(currentField.dropdownNames || []), ""];
    onUpdate({
      ...currentField,
      dropdownConfig: newDropdownConfig,
      dropdownNames: newDropdownNames,
    });
  };

  const removeDropdown = (index) => {
    const newDropdownConfig = currentField.dropdownConfig.filter(
      (_, i) => i !== index
    );
    const newDropdownNames = currentField.dropdownNames.filter(
      (_, i) => i !== index
    );
    onUpdate({
      ...currentField,
      dropdownConfig: newDropdownConfig,
      dropdownNames: newDropdownNames,
    });
  };

  const updateDropdownName = (index, value) => {
    const formattedKey = `entry.${value.replace(/\s+/g, "_")}`;

    const newDropdownNames = [...(currentField.dropdownNames || [])];
    newDropdownNames[index] = formattedKey;

    const newDropdownConfig = [...(currentField.dropdownConfig || [])];
    newDropdownConfig[index] = {
      ...newDropdownConfig[index],
      key: value,
    };

    onUpdate({
      ...currentField,
      dropdownConfig: newDropdownConfig,
      dropdownNames: newDropdownNames,
    });
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="bg-gradient-to-r from-indigo-50 to-white py-2 px-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Field {idx + 1}
              {currentField.required && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                  Required
                </span>
              )}
            </h3>
            {currentField.heading && (
              <p className="text-sm text-gray-500 font-medium">
                ID: {currentField.name}
              </p>
            )}
          </div>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all duration-200 group flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium group-hover:text-red-600">Remove</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Field Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={currentField.type}
                onChange={handleChange}
                className="w-full sm:flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="text">Text Input</option>
                <option value="email">Email Input</option>
                <option value="radio">Radio Buttons</option>
                <option value="checkbox">Checkboxes</option>
                <option value="dropdown">Dropdown Menu</option>
                <option value="file">File Upload</option>
                <option value="textarea">Text Area</option>
              </select>
              {/* <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>

          {currentField.type !== "dropdown" && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Field Name
              </label>
              <input
                type="text"
                name="heading"
                value={currentField.heading}
                onChange={handleChangeName}
                className="w-full sm:flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Enter field name"
              />
            </div>
          )}

          {(currentField.type === "text" ||
            currentField.type === "email" ||
            currentField.type === "textarea") && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Placeholder Text
              </label>
              <input
                type="text"
                name="placeholder"
                value={currentField.placeholder || ""}
                onChange={handleChange}
                placeholder="Write placeholder text"
                className="w-full sm:flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          )}
        </div>

        {(currentField.type === "radio" ||
          currentField.type === "checkbox") && (
          <div className="space-y-2 bg-gray-50 py-4 px-3 rounded-xl">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Options</h4>
              <button
                onClick={addLabel}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add Option</span>
              </button>
            </div>
            <div className="space-y-3">
              {currentField.labels?.map((label, index) => (
                <div
                  key={index}
                  className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm"
                >
                  {/* Heading and Cross Icon (Mobile View) */}
                  <div className="flex justify-between w-full sm:w-auto items-center sm:items-center">
                    <span className="text-sm sm:text-base font-medium text-gray-500">
                      Option {index + 1}
                    </span>
                    <button
                      onClick={() => removeLabel(index)}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 sm:hidden"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => handleLabelsChange(index, e.target.value)}
                    placeholder="Enter option text"
                    className="flex-grow w-full sm:w-auto p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />

                  {/* Cross Icon (Desktop View) */}
                  <button
                    onClick={() => removeLabel(index)}
                    className="hidden sm:block text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentField.type === "dropdown" && currentField.dropdownConfig && (
          <div className="space-y-6 bg-gray-50 px-2 py-6 rounded-xl">
            {/* Header with Title and Add Dropdown Button */}
            <div className="flex flex-wrap justify-between items-center gap-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Dropdown Menus
              </h4>
              <button
                onClick={addDropdown}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2"
              >
                <span className="sm:inline-flex">
                  <Plus className="w-4 h-4" />
                </span>
                <span className="font-medium hidden sm:inline-block">
                  Add Dropdown
                </span>
              </button>
            </div>

            {/* Dropdown List */}
            {currentField.dropdownConfig.map((config, dropdownIndex) => (
              <div
                key={dropdownIndex}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4"
              >
                {/* Dropdown Header */}
                <div className="flex flex-wrap justify-between items-center gap-y-2">
                  <h5 className="text-lg font-semibold text-gray-900">
                    Dropdown {dropdownIndex + 1}
                  </h5>
                  <button
                    onClick={() => removeDropdown(dropdownIndex)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <span className="hidden sm:flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      <span className="font-medium">Remove</span>
                    </span>
                    <span className="inline-flex sm:hidden bg-red-50 rounded-full p-2">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </span>
                  </button>
                </div>

                {/* Dropdown Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dropdown Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter dropdown name"
                    value={currentField.dropdownConfig[dropdownIndex].key}
                    onChange={(e) =>
                      updateDropdownName(dropdownIndex, e.target.value)
                    }
                  />
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {config.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between w-full sm:w-auto items-center sm:items-center">
                        <span className="text-sm sm:text-base font-medium text-gray-500">
                          Option {optionIndex + 1}
                        </span>
                        <button
                          onClick={() =>
                            removeOption(dropdownIndex, optionIndex)
                          }
                          className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 sm:hidden"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
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
                        className="flex-grow w-full sm:w-auto p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Enter option text"
                      />
                      <button
                        onClick={() => removeOption(dropdownIndex, optionIndex)}
                        className="hidden sm:block text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Option Button */}
                <button
                  onClick={() => addOption(dropdownIndex)}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Option</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {currentField.type === "file" && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
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
              className="w-full sm:flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g. image/png, image/jpeg, application/pdf"
            />
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-4 h-4" />
              Separate file types with commas
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
          {currentField.type === "radio" && (
            <label className="relative flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) =>
                  onUpdate({
                    ...currentField,
                    otherKey: e.target.checked ? ".other_option_response" : "",
                  })
                }
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all duration-200 group-hover:border-indigo-400"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Include "Other" option
              </span>
            </label>
          )}
          <label className="relative flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={currentField.required || false}
              onChange={(e) =>
                onUpdate({ ...currentField, required: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all duration-200 group-hover:border-indigo-400"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Required field
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormFieldEditor;

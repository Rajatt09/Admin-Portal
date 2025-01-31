import React, { useState } from "react";
import { Plus, Edit3, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useFormStore } from "./OpticaFormStore";
import FormFieldEditor from "./FormFieldEditor";
import Navbar from "../../components/Navbar/Navbar";

const FormBuilder = () => {
  const { formConfig, updateFormConfig } = useFormStore();
  const [headerInfo, setHeaderInfo] = useState(formConfig.headerInfo);
  const [instructionInfo, setInstructionInfo] = useState(
    formConfig.instructionInfo
  );
  const [footerInfo, setFooterInfo] = useState(formConfig.footerInfo);
  const [newInstruction, setNewInstruction] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    return /^[0-9]{10}$/.test(phoneNumber); 
  };
  
  const handlePhoneNumberChange = (person, value) => {
    if (/^\d{0,10}$/.test(value)) { // Allow only numbers up to 10 digits
      updateFooterInfo(person, "Phno", value);
    }
  
    if (value.length === 10 && !validatePhoneNumber(value)) {
      console.error("Invalid phone number");
    }
  };
  

  const submitForm = () => {
    console.log("form data is: ", formConfig);
  };

  const updateHeaderInfo = (key, value) => {
    const updatedHeader = { ...headerInfo, [key]: value };
    setHeaderInfo(updatedHeader);
    updateFormConfig({ ...formConfig, headerInfo: updatedHeader });
  };

  const updateInstructionInfo = (key, value) => {
    const updatedInstruction = { ...instructionInfo, [key]: value };
    setInstructionInfo(updatedInstruction);
    updateFormConfig({ ...formConfig, instructionInfo: updatedInstruction });
  };

  const addInstruction = () => {
    if (newInstruction.trim() === "") return;
    const updatedInstructions = [
      ...instructionInfo.instructions,
      newInstruction,
    ];
    updateInstructionInfo("instructions", updatedInstructions);
    setNewInstruction("");
  };

  const deleteInstruction = (index) => {
    const updatedInstructions = instructionInfo.instructions.filter(
      (_, idx) => idx !== index
    );
    updateInstructionInfo("instructions", updatedInstructions);
  };

  const updateFooterInfo = (section, key, value) => {
    const updatedFooter = {
      ...footerInfo,
      contactus: {
        ...footerInfo.contactus,
        [section]: {
          ...footerInfo.contactus[section],
          [key]: value,
        },
      },
    };
    setFooterInfo(updatedFooter);
    updateFormConfig({ ...formConfig, footerInfo: updatedFooter });
  };

  const addField = () => {
    const newField = {
      heading: ``,
      type: "text",
      required: false,
    };
    updateFormConfig({
      ...formConfig,
      formInfo: [...formConfig.formInfo, newField],
    });
  };

  const updateField = (index, updatedField) => {
    const newFormInfo = [...formConfig.formInfo];
    newFormInfo[index] = updatedField;
    updateFormConfig({
      ...formConfig,
      formInfo: newFormInfo,
    });
  };

  const deleteField = (index) => {
    const newFormInfo = formConfig.formInfo.filter((_, i) => i !== index);
    updateFormConfig({
      ...formConfig,
      formInfo: newFormInfo,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 w-16 h-full bg-indigo-900" />

      <div className="ml-16">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Form Builder</h2>
          </div>
          <button
            onClick={submitForm}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md z-10"
          >
            <span>Create form</span>
          </button>
        </div>

        <button
          onClick={addField}
          className="fixed bottom-8 right-8 flex items-center space-x-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md z-10"
        >
          <Plus size={20} />
          <span>Add Field</span>
        </button>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {/* Form Title Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Form Title
                </h3>
                <input
                  type="text"
                  value={headerInfo.heading}
                  onChange={(e) => updateHeaderInfo("heading", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter the title of the form"
                />
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {instructionInfo.heading}
                </h3>

                <div className="space-y-3 mb-6">
                  {instructionInfo.instructions.map((inst, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-all duration-200"
                    >
                      <span className="text-gray-700">{inst}</span>
                      <button
                        onClick={() => deleteInstruction(idx)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={newInstruction}
                    onChange={(e) => setNewInstruction(e.target.value)}
                    className="w-full sm:flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Add a new instruction"
                  />
                  <button
                    onClick={addInstruction}
                    className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add Instruction
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {["person1", "person2"].map((person, idx) => (
                    <div key={person} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4 text-gray-800">
                        Contact Person {idx + 1}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={footerInfo.contactus[person].name}
                          onChange={(e) =>
                            updateFooterInfo(person, "name", e.target.value)
                          }
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          placeholder="Name"
                        />
                       <input
                        type="text"
                        value={footerInfo.contactus[person].Phno}
                        onChange={(e) => handlePhoneNumberChange(person, e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            {formConfig.formInfo.map((field, index) => (
              <FormFieldEditor
                key={index}
                idx={index}
                field={field}
                onUpdate={(updatedField) => updateField(index, updatedField)}
                onDelete={() => deleteField(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;

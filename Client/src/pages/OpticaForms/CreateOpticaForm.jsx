import React from "react";
import { Plus } from "lucide-react";
import { useFormStore } from "./OpticaFormStore";
import FormFieldEditor from "./FormFieldEditor";
import Navbar from "../../components/Navbar/Navbar";

const FormBuilder = () => {
  const { formConfig, updateFormConfig } = useFormStore();

  const addField = () => {
    const newField = {
      heading: `New Field ${formConfig.formInfo.length + 1}`,
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
    <>
      <div className="p-6">
        <Navbar />
        <div
          className="flex justify-between items-center mb-6 ml-[120px]"
          //   style={{ backgroundColor: "green", width: "100%" }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Form Builder</h2>
          <button
            onClick={addField}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Field</span>
          </button>
        </div>
        <div className="space-y-4 ml-[120px]">
          {formConfig.formInfo.map((field, index) => (
            <FormFieldEditor
              key={index}
              field={field}
              onUpdate={(updatedField) => updateField(index, updatedField)}
              onDelete={() => deleteField(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FormBuilder;

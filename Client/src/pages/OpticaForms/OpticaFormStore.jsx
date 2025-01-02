import { create } from "zustand";

const defaultFormConfig = {
  instructionInfo: {
    heading: "Instructions",
    description: "Read the below instructions carefully:",
    instructions: [],
  },
  headerInfo: {
    heading: "New Form",
  },
  footerInfo: {
    contactus: {
      heading: "For any query please contact:",
      person1: {
        name: "",
        Phno: "",
      },
      person2: {
        name: "",
        Phno: "",
      },
    },
  },
  formInfo: [],
};

export const useFormStore = create((set) => ({
  formConfig: defaultFormConfig,
  updateFormConfig: (config) => set({ formConfig: config }),
}));

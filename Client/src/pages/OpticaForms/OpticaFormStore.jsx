import { Sheet } from "lucide-react";
import { create } from "zustand";

const defaultFormConfig = {
  sheetNo: "",
  instructionInfo: {
    heading: "Instructions",
    description: "Read the below instructions carefully:",
    instructions: [],
  },
  headerInfo: {
    heading: "",
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
  deadline: {
    time: "",
  },
};

export const useFormStore = create((set) => ({
  formConfig: defaultFormConfig,
  updateFormConfig: (config) => set({ formConfig: config }),
}));

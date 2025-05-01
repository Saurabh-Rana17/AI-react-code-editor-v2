import { createContext } from "react";

export const EditorContext = createContext({
  setCode: () => {},
  setFileCode: () => {},
  setLanguage: () => {},
  theme: "cobalt",
  setTheme: () => {},
  setShowAiEditor: () => {},
  setOpenModal: () => {},
  code: "",
  language: "",
});

import { createContext } from "react";

export const EditorContext = createContext({
  onSelectChange: () => {},
  setCode: () => {},
  setFileCode: () => {},
});

import React, { useContext } from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import languageConstant from "../constants/languageConstant";
import { EditorContext } from "../pages/Code Editor/EditorContext";

const LanguagesDropdown = () => {
  const { setLanguage } = useContext(EditorContext);
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  return (
    <div className="px-1 ml-1 py-2 mr-2">
      <Select
        className="text-black w-44"
        placeholder={`Filter By Category`}
        options={languageConstant}
        styles={customStyles}
        defaultValue={languageConstant[54]}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
      />
    </div>
  );
};

export default LanguagesDropdown;

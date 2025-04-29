import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";
import languageConstant from "../constants/languageConstant";

const LanguagesDropdown = ({ onSelectChange }) => {
  const options = [
    { name: "javascript", label: "Javascipt" },
    { name: "python", label: "Python" },
    { name: "java", label: "Java" },
  ];

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

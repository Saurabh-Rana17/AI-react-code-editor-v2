import React, { useContext } from "react";
import { EditorContext } from "./EditorContext";

export default function FileUploader() {
  const { setCode, setFileCode } = useContext(EditorContext);
  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setCode(content);
      setFileCode(content);
      // console.log(content);
    };

    reader.readAsText(file);
  }

  return (
    <div className="px-1 py-2">
      <input className="w-28" type="file" onChange={handleFileChange} />
    </div>
  );
}

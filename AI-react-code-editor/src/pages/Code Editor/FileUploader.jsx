import React from "react";

export default function FileUploader({ setCode, setFileCode }) {
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

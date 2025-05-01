import React, { useContext } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { EditorContext } from "./EditorContext";

export default function SaveButton() {
  const { code, language } = useContext(EditorContext);

  function handleSave() {
    const blob = new Blob([code], { type: "text/plain" });

    // Generate a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create an anchor element with download attribute set to the desired filename and href attribute set to the generated URL
    const a = document.createElement("a");
    a.href = url;
    switch (language.name) {
      case "javascript":
        a.download = "myCode.js"; // Change the filename as needed
        break;
      case "java":
        a.download = "myCode.java"; // Change the filename as needed
        break;
      case "python":
        a.download = "myCode.py"; // Change the filename as needed
        break;
      case "c":
        a.download = "myCode.c"; // Change the filename as needed
        break;
      case "cpp":
        a.download = "myCode.cpp"; // Change the filename as needed
        break;

      default:
        a.download = "myCode.txt"; // Change the filename as needed

        break;
    }

    // Simulate a click on the anchor element to trigger the file download
    a.click();

    // Clean up by revoking the URL object to free up resources
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-2 py-2 ">
      <button
        className=" inline-block cursor-pointer border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 font-bold "
        onClick={handleSave}
      >
        <CiSaveDown2 className="inline-block mr-1" />
        Save
      </button>
    </div>
  );
}

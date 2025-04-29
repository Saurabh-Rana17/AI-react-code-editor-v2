import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SwitchAi({ handleShowAiEditor }) {
  const [isGreen, setIsGreen] = useState(false);
  return (
    <div className="px-2 py-2 ">
      <button
        onClick={() => {
          handleShowAiEditor();
          setIsGreen((prev) => !prev);
        }}
        className=" border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
      >
        {" "}
        <div
          className={`h-2 w-2 mr-1 rounded-full  inline-block ${
            isGreen ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        Ai Editor
      </button>
    </div>
  );
}

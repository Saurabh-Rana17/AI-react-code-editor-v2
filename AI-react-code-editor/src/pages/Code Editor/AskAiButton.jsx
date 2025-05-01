import React, { useContext } from "react";
import { EditorContext } from "./EditorContext";

export default function AskAiButton() {
  const { setOpenModal } = useContext(EditorContext);
  function handleAskAi() {
    setOpenModal(true);
  }
  return (
    <div className="px-2 py-2 ">
      <button
        onClick={handleAskAi}
        className=" border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
      >
        Ask AI
      </button>
    </div>
  );
}

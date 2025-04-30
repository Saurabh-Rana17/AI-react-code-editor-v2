import React from "react";
import { VscOpenPreview } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function PreviewEditorButton() {
  return (
    <div className="px-2 py-2 ">
      <Link
        to={"preview"}
        className=" inline-block cursor-pointer border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 font-bold"
      >
        <VscOpenPreview className="inline-block mr-1" />
        Preview Editor
      </Link>
    </div>
  );
}

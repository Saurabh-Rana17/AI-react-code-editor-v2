import React from "react";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import ThemeDropdown from "../../components/ThemeDropdown";
import FileUploader from "./FileUploader";
import SwitchAi from "./SwitchAi";
import AskAiButton from "./AskAiButton";
import PreviewEditorButton from "./PreviewEditorButton";
import SaveButton from "./SaveButton";

export default function Menu() {
  return (
    <div className="flex flex-row">
      <FileUploader />
      <LanguagesDropdown />
      <ThemeDropdown />
      <SwitchAi />
      <AskAiButton />
      <PreviewEditorButton />
      <SaveButton />
    </div>
  );
}

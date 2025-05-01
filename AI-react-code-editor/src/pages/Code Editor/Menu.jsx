import React from "react";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import ThemeDropdown from "../../components/ThemeDropdown";
import FileUploader from "./FileUploader";
import SwitchAi from "./SwitchAi";
import AskAiButton from "./AskAiButton";
import PreviewEditorButton from "./PreviewEditorButton";
import SaveButton from "./SaveButton";

export default function Menu({ handleShowAiEditor, handleSave, handleAskAi }) {
  return (
    <div className="flex flex-row">
      <FileUploader />
      <LanguagesDropdown />
      <ThemeDropdown />
      <SwitchAi handleShowAiEditor={handleShowAiEditor} />
      <AskAiButton handleAskAi={handleAskAi} />
      <PreviewEditorButton />
      <SaveButton handleSave={handleSave} />
    </div>
  );
}

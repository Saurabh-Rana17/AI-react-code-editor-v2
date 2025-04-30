import React from "react";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import ThemeDropdown from "../../components/ThemeDropdown";
import { CiSaveDown2 } from "react-icons/ci";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import FileUploader from "./FileUploader";
import SwitchAi from "./SwitchAi";
import AskAiButton from "./AskAiButton";
import PreviewEditorButton from "./PreviewEditorButton";
import SaveButton from "./SaveButton";

export default function Menu({
  onSelectChange,
  handleThemeChange,
  theme,
  handleShowAiEditor,
  setOpenModal,
  setPromptValue,
  setActivePrompt,
  handleSave,
  openModal,
  handleGptResp,
  promtValue,
  activePrompt,
  handleSelfGpt,
  gptLoading,
  gptResponse,
  setCode,
  setFileCode,
  handleAskAi,
}) {
  return (
    <div className="flex flex-row">
      <FileUploader setCode={setCode} setFileCode={setFileCode} />
      <LanguagesDropdown onSelectChange={onSelectChange} />
      <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
      <SwitchAi handleShowAiEditor={handleShowAiEditor} />
      <AskAiButton handleAskAi={handleAskAi} />
      <PreviewEditorButton />
      <SaveButton handleSave={handleSave} />
    </div>
  );
}

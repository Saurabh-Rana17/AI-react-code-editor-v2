import React from "react";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import ThemeDropdown from "../../components/ThemeDropdown";
import { Link } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { CiSaveDown2 } from "react-icons/ci";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import FileUploader from "./FileUploader";
import SwitchAi from "./SwitchAi";
import AskAiButton from "./AskAiButton";
import PreviewEditorButton from "./PreviewEditorButton";

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

      <div className="px-2 py-2 ">
        <button
          className=" inline-block cursor-pointer border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 font-bold "
          onClick={handleSave}
        >
          <CiSaveDown2 className="inline-block mr-1" />
          Save
        </button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Ask Ai</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleGptResp}>
            <TextInput
              value={promtValue}
              onChange={(e) => setPromptValue(e.target.value)}
              placeholder="Enter your query here"
              className="w-4/5 inline-block mr-4"
              variant="outlined"
            />
            <Button
              className="inline-block"
              color={"success"}
              onClick={activePrompt === "pai" ? handleGptResp : handleSelfGpt}
              // onClick={handleSelfGpt}
            >
              Generate
            </Button>
          </form>
          <div className="mt-1">
            <button
              className={`px-3 py-2 my-2 rounded-xl hover:bg-gray-200 mx-2 border-2 ${
                activePrompt === "pai" && "bg-gray-200"
              }  `}
              onClick={() => setActivePrompt("pai")}
            >
              Pai-001
            </button>
          </div>
          <pre className="mt-3 ">
            {gptLoading && (
              <>
                <p>Processing Query....</p>{" "}
                <div>
                  <Spinner aria-label="Default status example" />
                </div>
              </>
            )}

            {gptResponse || gptLoading ? (
              <div>
                <SyntaxHighlighter language="javascript">
                  {!gptLoading && gptResponse}
                </SyntaxHighlighter>
              </div>
            ) : (
              <p className="p-2 pl-4  bg-zinc-100">
                click on generate to get your response
              </p>
            )}
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button color={"failure"} onClick={() => setOpenModal(false)}>
            Close{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal code */}
    </div>
  );
}

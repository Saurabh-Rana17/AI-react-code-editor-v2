import React from "react";
import LanguagesDropdown from "../../components/LanguagesDropdown";
import ThemeDropdown from "../../components/ThemeDropdown";
import { Link } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { CiSaveDown2 } from "react-icons/ci";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

export default function Menu({
  handleFileChange,
  onSelectChange,
  handleThemeChange,
  theme,
  handleShowAiEditor,
  showAiEditor,
  setOpenModal,
  setPromptValue,
  setGptResponse,
  setActivePrompt,
  handleSave,
  openModal,
  handleGptResp,
  promtValue,
  activePrompt,
  handleSelfGpt,
  gptLoading,
  gptResponse,
}) {
  return (
    <div className="flex flex-row">
      <div className="px-1 py-2">
        <input className="w-28" type="file" onChange={handleFileChange} />
      </div>
      <div className="px-1 ml-1 py-2 mr-2">
        <LanguagesDropdown onSelectChange={onSelectChange} />
      </div>
      <div className="px-4 py-2">
        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
      </div>
      <div className="px-2 py-2 ">
        <button
          onClick={handleShowAiEditor}
          className=" border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
        >
          {" "}
          <div
            className={`h-2 w-2 mr-1 rounded-full  inline-block ${
              showAiEditor ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          Ai Editor
        </button>
      </div>
      <div className="px-2 py-2 ">
        <button
          onClick={() => {
            setOpenModal(true);
            setPromptValue("");
            setGptResponse("");
            setActivePrompt("pai");
          }}
          className=" border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
        >
          Ask AI{" "}
        </button>
      </div>
      <div className="px-2 py-2 ">
        <Link
          to={"preview"}
          className=" inline-block cursor-pointer border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 font-bold"
        >
          <VscOpenPreview className="inline-block mr-1" />
          Preview Editor
        </Link>
      </div>

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
            {/* <button
          className={`px-3 py-2 my-2 rounded-xl hover:bg-gray-200 mx-2 border-2 ${
            activePrompt === "selfgpt" && "bg-gray-200"
          }`}
          onClick={() => setActivePrompt("selfgpt")}
        >
          <span>
            <RiRobot2Line className="inline-block mr-1" />
            Ai Model
          </span>
        </button> */}
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

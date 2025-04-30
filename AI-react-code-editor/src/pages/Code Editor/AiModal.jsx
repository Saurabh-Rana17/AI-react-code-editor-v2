import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function AiModal({
  setOpenModal,
  setPromptValue,
  setActivePrompt,
  openModal,
  handleGptResp,
  promtValue,
  activePrompt,
  handleSelfGpt,
  gptLoading,
  gptResponse,
}) {
  return (
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
  );
}

import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function AiModal({ openModal, setOpenModal }) {
  const [gptLoading, setGptLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState("");
  const [promtValue, setPromptValue] = useState("");

  async function handleGptResp(e) {
    e.preventDefault();
    console.log(promtValue);
    setGptLoading(true);

    try {
      const response = await fetch(
        "https://ai-react-code-editor.onrender.com/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: promtValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      setGptResponse(data.response.replace("```", ""));
    } catch (error) {
      console.error(error.message);
    } finally {
      setGptLoading(false);
    }
  }

  return (
    <Modal
      show={openModal}
      onClose={() => {
        setOpenModal(false);
        setGptLoading(false);
      }}
    >
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
            onClick={handleGptResp}
          >
            Generate
          </Button>
        </form>

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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

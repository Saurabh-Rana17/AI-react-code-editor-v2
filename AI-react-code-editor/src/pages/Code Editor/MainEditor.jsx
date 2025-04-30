import React, { useEffect, useState } from "react";
import CodeEditorWindow from "../../components/CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress";
import Footer from "../../components/Footer";
import OutputWindow from "../../components/OutputWindow";
import CustomInput from "../../components/CustomInput";
import OutputDetails from "../../components/OutputDetails";
import CodeEditorWindow2 from "../../components/CodeEditorWindow2";
import { SiCompilerexplorer } from "react-icons/si";
import languageConstant from "../../constants/languageConstant";
import Menu from "./Menu";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import AiModal from "./AiModal";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const MainEditor = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageConstant[54]);
  const [showAiEditor, setShowAiEditor] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [gptResponse, setGptResponse] = useState("");
  const [promtValue, setPromptValue] = useState("");
  const [gptLoading, setGptLoading] = useState(false);
  const [activePrompt, setActivePrompt] = useState("pai");
  const [filecode, setFileCode] = useState("");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handlePiston();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("monokai").then((_) =>
      setTheme({ value: "monokai", label: "monokai" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function handleShowAiEditor() {
    setShowAiEditor((prev) => !prev);
  }

  function handleAskAi() {
    setOpenModal(true);
    setPromptValue("");
    setGptResponse("");
    setActivePrompt("pai");
  }

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

  async function handleSelfGpt() {
    console.log(promtValue);
    setGptLoading(true);
    const promptData = {
      keyword: promtValue,
    };
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    });
    const data = await res.json();
    console.log(data.predicted_code);
    setGptResponse(data.predicted_code);
    setGptLoading(false);
  }

  function handleSave() {
    const blob = new Blob([code], { type: "text/plain" });

    // Generate a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create an anchor element with download attribute set to the desired filename and href attribute set to the generated URL
    const a = document.createElement("a");
    a.href = url;
    switch (language.name) {
      case "javascript":
        a.download = "myCode.js"; // Change the filename as needed
        break;
      case "java":
        a.download = "myCode.java"; // Change the filename as needed
        break;
      case "python":
        a.download = "myCode.py"; // Change the filename as needed
        break;
      case "c":
        a.download = "myCode.c"; // Change the filename as needed
        break;
      case "cpp":
        a.download = "myCode.cpp"; // Change the filename as needed
        break;

      default:
        a.download = "myCode.txt"; // Change the filename as needed

        break;
    }

    // Simulate a click on the anchor element to trigger the file download
    a.click();

    // Clean up by revoking the URL object to free up resources
    URL.revokeObjectURL(url);
  }

  async function handlePiston() {
    setProcessing(true);
    const formData = {
      language: language.name,
      version: language.version,
      files: [
        {
          content: code,
        },
      ],
      stdin: customInput,
    };

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(formData),
      });

      // Check if request was successful
      if (response.ok) {
        const responseData = await response.json();
        // Handle successful response data
        console.log(responseData.run.code);
        setOutputDetails(responseData.run);
        if (responseData.run.code === 0) {
          showSuccessToast(`Compiled Successfully!`);
        } else {
          showErrorToast("failed to execute");
        }
        setProcessing(false);
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
        setProcessing(false);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error);
      setProcessing(false);
    }
  }

  // console.log(code);

  // console.log(activePrompt);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* menu */}

      <Menu
        setCode={setCode}
        setFileCode={setFileCode}
        onSelectChange={onSelectChange}
        handleThemeChange={handleThemeChange}
        theme={theme}
        handleShowAiEditor={handleShowAiEditor}
        showAiEditor={showAiEditor}
        setActivePrompt={setActivePrompt}
        setOpenModal={setOpenModal}
        setPromptValue={setPromptValue}
        activePrompt={activePrompt}
        gptLoading={gptLoading}
        gptResponse={gptResponse}
        handleGptResp={handleGptResp}
        handleSave={handleSave}
        handleSelfGpt={handleSelfGpt}
        openModal={openModal}
        promtValue={promtValue}
        handleAskAi={handleAskAi}
      />
      {/* window */}
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          {showAiEditor && (
            <CodeEditorWindow
              key={filecode}
              code={code}
              onChange={onChange}
              language={language?.name}
              theme={theme.value}
            />
          )}
          {!showAiEditor && (
            <CodeEditorWindow2
              key={filecode}
              code={code}
              onChange={onChange}
              language={language?.name}
              theme={theme.value}
            />
          )}
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <div>
              <button
                onClick={handlePiston}
                disabled={!code}
                className={classnames(
                  "mt-4 inline-block border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 hover:bg-green-500 hover:text-white",
                  !code ? "opacity-50" : ""
                )}
              >
                <SiCompilerexplorer className="inline-block m-1" />

                {processing ? "Processing..." : "Compile and Execute"}
              </button>
            </div>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>

      <Footer />

      <AiModal
        activePrompt={activePrompt}
        gptLoading={gptLoading}
        gptResponse={gptResponse}
        handleGptResp={handleGptResp}
        handleSelfGpt={handleSelfGpt}
        openModal={openModal}
        promtValue={promtValue}
        setActivePrompt={setActivePrompt}
        setOpenModal={setOpenModal}
        setPromptValue={setPromptValue}
      />
    </>
  );
};
export default MainEditor;

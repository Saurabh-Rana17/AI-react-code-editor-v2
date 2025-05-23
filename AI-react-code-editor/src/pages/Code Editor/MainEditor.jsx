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
import AiModal from "./AiModal";
import { EditorContext } from "./EditorContext";
import { javascriptDefault } from "../../utils/CONSTANT";

const MainEditor = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageConstant[54]);
  const [showAiEditor, setShowAiEditor] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filecode, setFileCode] = useState("");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
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

  return (
    <>
      <EditorContext.Provider
        value={{
          setLanguage,
          setCode,
          setFileCode,
          theme,
          setTheme,
          setShowAiEditor,
          setOpenModal,
          code,
          language,
        }}
      >
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

        <Menu />
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

        <AiModal openModal={openModal} setOpenModal={setOpenModal} />
      </EditorContext.Provider>
    </>
  );
};
export default MainEditor;

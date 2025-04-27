import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";

// Import language modes
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-c_cpp"; // Import C++ mode explicitly
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-typescript";

// Import snippets
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/ruby";
import "ace-builds/src-noconflict/snippets/golang";
import "ace-builds/src-noconflict/snippets/csharp";
import "ace-builds/src-noconflict/snippets/elixir";
import "ace-builds/src-noconflict/snippets/typescript";

// Import themes
import "ace-builds/src-noconflict/theme-github_dark";

// Import extension for autocompletion
import "ace-builds/src-noconflict/ext-language_tools";
import { AceSnippet } from "../constants/AceSnippet";
import { ReactAceThemes } from "../constants/ReactAceThemes";

const CodeEditorWindow2 = ({ onChange, language, code, theme }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;

      const customCompletions = AceSnippet;

      window.ace.acequire("ace/ext/language_tools").addCompleter({
        getCompletions: function (editor, session, pos, prefix, callback) {
          callback(null, customCompletions);
        },
      });
    }
  }, []);

  return (
    <>
      <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
        <AceEditor
          ref={editorRef}
          height="85vh"
          width={`100%`}
          mode={language || "javascript"}
          value={value}
          theme={theme}
          fontSize={14}
          defaultValue=""
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          setOptions={{
            useWorker: false,
            enableSnippets: true,
          }}
          onChange={handleEditorChange}
        />
      </div>
    </>
  );
};

export default CodeEditorWindow2;

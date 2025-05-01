import React, { useContext } from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";
import { ReactAceThemes } from "../constants/ReactAceThemes";
import { EditorContext } from "../pages/Code Editor/EditorContext";
import { defineTheme } from "../lib/defineTheme";

const ThemeDropdown = () => {
  const { theme, setTheme } = useContext(EditorContext);

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  return (
    <div className="px-4 py-2">
      <Select
        placeholder={`Select Theme`}
        // options={languageOptions}
        // options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        //   label: themeName,
        //   value: themeId,
        //   key: themeId,
        // }))}
        options={ReactAceThemes.map((theme) => ({
          label: theme,
          value: theme,
          key: theme,
        }))}
        value={theme}
        styles={customStyles}
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeDropdown;

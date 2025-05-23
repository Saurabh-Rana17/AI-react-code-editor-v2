// import { loader } from "@monaco-editor/react";
// import "monaco-themes/themes/Monokai.json";

// const monacoThemes = {
//   active4d: "Active4D",
//   "all-hallows-eve": "All Hallows Eve",
//   amy: "Amy",
//   "birds-of-paradise": "Birds of Paradise",
//   blackboard: "Blackboard",
//   "brilliance-black": "Brilliance Black",
//   "brilliance-dull": "Brilliance Dull",
//   "chrome-devtools": "Chrome DevTools",
//   "clouds-midnight": "Clouds Midnight",
//   clouds: "Clouds",
//   cobalt: "Cobalt",
//   dawn: "Dawn",
//   dreamweaver: "Dreamweaver",
//   eiffel: "Eiffel",
//   "espresso-libre": "Espresso Libre",
//   github: "GitHub",
//   idle: "IDLE",
//   katzenmilch: "Katzenmilch",
//   "kuroir-theme": "Kuroir Theme",
//   lazy: "LAZY",
//   "magicwb--amiga-": "MagicWB (Amiga)",
//   "merbivore-soft": "Merbivore Soft",
//   merbivore: "Merbivore",
//   "monokai-bright": "Monokai Bright",
//   monokai: "Monokai",
//   "night-owl": "Night Owl",
//   "oceanic-next": "Oceanic Next",
//   "pastels-on-dark": "Pastels on Dark",
//   "slush-and-poppies": "Slush and Poppies",
//   "solarized-dark": "Solarized-dark",
//   "solarized-light": "Solarized-light",
//   spacecadet: "SpaceCadet",
//   sunburst: "Sunburst",
//   "textmate--mac-classic-": "Textmate (Mac Classic)",
//   "tomorrow-night-blue": "Tomorrow-Night-Blue",
//   "tomorrow-night-bright": "Tomorrow-Night-Bright",
//   "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
//   "tomorrow-night": "Tomorrow-Night",
//   tomorrow: "Tomorrow",
//   twilight: "Twilight",
//   "upstream-sunburst": "Upstream Sunburst",
//   "vibrant-ink": "Vibrant Ink",
//   "xcode-default": "Xcode_default",
//   zenburnesque: "Zenburnesque",
//   iplastic: "iPlastic",
//   idlefingers: "idleFingers",
//   krtheme: "krTheme",
//   monoindustrial: "monoindustrial",
// };

// const defineTheme = (theme) => {
//   return new Promise((res) => {
//     Promise.all([
//       loader.init(),
//       import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
//     ]).then(([monaco, themeData]) => {
//       monaco.editor.defineTheme(theme, themeData);
//       res();
//     });
//   });
// };

// export { defineTheme };

import { loader } from "@monaco-editor/react";

// Manually import themes you want to support
import Monokai from "monaco-themes/themes/Monokai.json";
import GitHub from "monaco-themes/themes/GitHub.json";
import Dracula from "monaco-themes/themes/Dracula.json";
import SolarizedDark from "monaco-themes/themes/Solarized-dark.json";
import SolarizedLight from "monaco-themes/themes/Solarized-light.json";
// Add more theme imports as needed

// Map your available themes
const themes = {
  monokai: Monokai,
  github: GitHub,
  dracula: Dracula,
  "solarized-dark": SolarizedDark,
  "solarized-light": SolarizedLight,
  // Add more mappings if you import more themes
};

const defineTheme = (theme) => {
  return new Promise((res) => {
    loader.init().then((monaco) => {
      const themeData = themes[theme];
      if (!themeData) {
        console.error(`Theme "${theme}" not found`);
        res(); // resolve anyway to avoid blocking
        return;
      }
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export { defineTheme };

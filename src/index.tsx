import { injectGlobal } from "@emotion/css";
import React from "react";
import { Player } from "@remotion/player";
import { MyComposition } from "./remotion/Composition";

import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

void injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }
`;
//   @font-face {
//     font-family: "Lato";
//     src: url("/fonts/Lato-Regular.ttf") format("truetype")
//     font-weight: normal;
//     font-style: normal;
//   }
//
//   @font-face {
//     font-family: "Lato";
//     src: url("/fonts/Lato-Bold.ttf") format("truetype")
//     font-weight: 700;
//     font-style: normal;
//   }
//
//   @font-face {
//     font-family: "Lato";
//     src: url("/fonts/Lato-Italic.ttf") format("truetype")
//     font-weight: normal;
//     font-style: italic;
//   }
//
//   body {
//     font-family: "Lato", sans-serif;
//     font-size: 18px;
//   }
// `

const theme = createTheme({
  typography: {
    fontSize: 18,
    fontFamily: "Lato, sans-serif, Arial",
  },
  palette: {
    mode: "dark",
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Player
      component={MyComposition}
      durationInFrames={120}
      compositionWidth={1280}
      compositionHeight={720}
      fps={30}
      controls
    />
  </ThemeProvider>
);

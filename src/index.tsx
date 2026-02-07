import { injectGlobal } from "@emotion/css";
import React from "react";
import { Player } from "@remotion/player";
import { MyComposition } from "./remotion/Composition";
import { datesCount, getFramesCount } from "./remotion/utils";
import App from "./App";

import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Typography } from "@mui/material";

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
    <Box
      sx={{
        maxWidth: 1400,
        margin: "0 auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        La Liga 2018/19
      </Typography>
      <Box>
        <App />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Season recap
        </Typography>
        <Player
          component={MyComposition}
          durationInFrames={getFramesCount(datesCount)}
          compositionWidth={1280}
          compositionHeight={720}
          fps={30}
          controls
          style={{ maxWidth: "100%", borderRadius: 8 }}
        />
      </Box>
    </Box>
  </ThemeProvider>
);

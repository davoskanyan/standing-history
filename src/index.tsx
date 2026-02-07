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
  body {
    background: linear-gradient(160deg, #0c0c0e 0%, #141418 50%, #0e0e12 100%);
    min-height: 100vh;
  }
`;

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: '"DM Sans", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.03em" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600, letterSpacing: "0.01em" },
  },
  palette: {
    mode: "dark",
    primary: { main: "#e8b923", dark: "#c49b1a", light: "#f0d04a" },
    background: {
      default: "#0c0c0e",
      paper: "#16161a",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { minWidth: 140 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover:not(.Mui-disabled)": {
            backgroundColor: "rgba(232, 185, 35, 0.12)",
          },
        },
      },
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "primary.main",
            mb: 0.5,
          }}
        >
          La Liga 2018/19
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Standings & results by matchweek
        </Typography>
      </Box>
      <Box>
        <App />
      </Box>
      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5, textTransform: "uppercase", letterSpacing: "0.08em" }}
        >
          Season recap
        </Typography>
        <Player
          component={MyComposition}
          durationInFrames={getFramesCount(datesCount)}
          compositionWidth={1280}
          compositionHeight={720}
          fps={30}
          controls
          style={{ maxWidth: "100%", borderRadius: 12 }}
        />
      </Box>
    </Box>
  </ThemeProvider>
);

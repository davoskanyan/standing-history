import { injectGlobal } from "@emotion/css";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import font from './Lato-Regular.ttf';

injectGlobal`
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

const lato = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    font-family: "Lato";
    src: url(${font}) format("truetype")
    font-weight: normal;
    font-style: normal;
  `
};

const theme = createMuiTheme({
  typography: {
    fontSize: 18,
    fontFamily: 'Lato, sans-serif, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lato],
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

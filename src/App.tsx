import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/globalStyle";
import Router from "./Router";
import { theme } from "./style/theme";
import { RecoilRoot } from "recoil";
import React from "react";

function App() {
  return (
    <>
      {/* <React.StrictMode> */}
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </RecoilRoot>
      {/* </React.StrictMode> */}
    </>
  );
}

export default App;

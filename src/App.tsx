import { BrowserView, MobileView } from "react-device-detect";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import MobileAlertPage from "./@pages/mobileAlertPage";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";

function App() {
  return (
    <>
      {/* <React.StrictMode> */}
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserView>
            <Router />
          </BrowserView>
          <MobileView>
            <MobileAlertPage />
          </MobileView>
        </ThemeProvider>
      </RecoilRoot>
      {/* </React.StrictMode> */}
    </>
  );
}

export default App;

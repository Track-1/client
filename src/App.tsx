import { RecoilEnv, RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

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

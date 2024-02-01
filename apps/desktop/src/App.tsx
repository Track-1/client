import { BrowserView, MobileView } from "react-device-detect";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import MobileLandingPage from "./@pages/mobileLandingPage";
import Router from "./Router";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import { Suspense } from "react";
import Loading from "./@components/@common/loading";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: true,
      },
    },
  });

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Suspense fallback={<Loading />}>
              <BrowserView>
                <Router />
              </BrowserView>
            </Suspense>
            <MobileView>
              <MobileLandingPage />
            </MobileView>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

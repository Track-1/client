import { OverlayProvider } from '@toss/use-overlay';
import { Suspense, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import Player from './components/common/Player/player';
import { PlayerProvider } from './context/playerContext';
import { GlobalStyle } from './style/globalStyle';
import { theme } from './style/theme';
import Loading from './components/common/Loading';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: true,
      },
    },
  });

  const isMobile = /Mobi/i.test(window.navigator.userAgent);

  useEffect(() => {
    if (!isMobile) {
      window.location.href = 'https://www.track1.site';
    }
  }, [isMobile]);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <OverlayProvider>
              <PlayerProvider>
                <GlobalStyle />
                <Suspense fallback={<Loading />}>
                  <Router />
                  <Player />
                </Suspense>
              </PlayerProvider>
            </OverlayProvider>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

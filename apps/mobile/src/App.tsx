import { OverlayProvider } from '@toss/use-overlay';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './style/globalStyle';
import { theme } from './style/theme';
import { useEffect } from 'react';
import { PlayerProvider } from './context/playerContext';
import Player from './components/common/Player/player';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
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
    <OverlayProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <PlayerProvider>
                <GlobalStyle />
                <Router />
                <Player />
              </PlayerProvider>
            </ThemeProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </CookiesProvider>
    </OverlayProvider>
  );
}

export default App;

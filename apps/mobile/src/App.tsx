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
    const $existingMeta = document.querySelector('meta[name="viewport"]');

    if (!isMobile) {
      window.location.href = 'https://www.track1.site';
    }

    if (isMobile) {
      const $meta = $existingMeta ?? document.createElement('meta');

      $meta.setAttribute('name', 'viewport');
      $meta.setAttribute(
        'content',
        'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      );

      if (!$existingMeta) {
        document.head.appendChild($meta);
      }
    }
  }, []);

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

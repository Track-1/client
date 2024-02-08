import { BrowserView, MobileView } from 'react-device-detect';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import MobileLandingPage from './@pages/mobileLandingPage';
import Router from './Router';
import { GlobalStyle } from './style/globalStyle';
import { theme } from './style/theme';
import { Suspense, useEffect } from 'react';
import Loading from './@components/@common/loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';

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

    if (isMobile) {
      window.location.href = 'https://m.track1.site';

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
            <GlobalStyle />
            <Suspense fallback={<Loading />}>
              <BrowserView>
                <Router />
              </BrowserView>
            </Suspense>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

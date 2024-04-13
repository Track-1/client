import { OverlayProvider } from '@toss/use-overlay';
import { Suspense, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './style/globalStyle';
import { theme } from './style/theme';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { suspense: true } },
      })
  );

  const isMobile = /Mobi/i.test(window.navigator.userAgent);

  // console.log(checkMaxInputLength(13, 10));

  // useEffect(() => {
  //   const $existingMeta = document.querySelector('meta[name="viewport"]');

  //   if (!isMobile) {
  //     window.location.href = 'https://www.track1.site';
  //   }

  //   if (isMobile) {
  //     const $meta = $existingMeta ?? document.createElement('meta');

  //     $meta.setAttribute('name', 'viewport');
  //     $meta.setAttribute(
  //       'content',
  //       'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
  //     );

  //     if (!$existingMeta) {
  //       document.head.appendChild($meta);
  //     }
  //   }
  // }, []);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <OverlayProvider>
              <GlobalStyle />
              <Router />
            </OverlayProvider>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

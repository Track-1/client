import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { GlobalStyle } from './style/globalStyle';

import Router from './Router';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  const isMobile = /Mobi/i.test(window.navigator.userAgent);

  // useEffect(() => {
  //   if (!isMobile) {
  //     window.location.href = 'https://www.track1.site';
  //   }
  // }, []);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

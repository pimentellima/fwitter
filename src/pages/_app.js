import { QueryClientProvider, QueryClient } from "react-query";
import { Analytics } from '@vercel/analytics/react';
import "../globals.css";

import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Analytics />
      </QueryClientProvider>
    </SessionProvider>
  );
};


export default App;

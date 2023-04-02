import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import '../globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,  
      },
    },
  })
  
const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)
  
  return(
    <ClerkProvider {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <Head>
              <title>Fwitter</title>
          </Head>
          {getLayout(<Component {...pageProps}/>)}
        </QueryClientProvider>
    </ClerkProvider>
    )
}

export default App;
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import '../globals.css';
import { ClerkProvider } from "@clerk/nextjs";

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
          {getLayout(<Component {...pageProps}/>)}
        </QueryClientProvider>
    </ClerkProvider>
    )
}

export default App;
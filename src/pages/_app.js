import { QueryClientProvider, QueryClient } from "react-query";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { IKContext } from "imagekitio-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      <IKContext urlEndpoint={"https://ik.imagekit.io/fwitter"}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </IKContext>
    </ClerkProvider>
  );
};

export default App;

import "@/styles/globals.css";
import { useApolloClient } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { TelegramWebAppProvider } from "@/components/TelegramWebApp";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApolloClient();
  return (
    <TelegramWebAppProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </TelegramWebAppProvider>
  );
}

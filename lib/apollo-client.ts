import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { useLocalStorage } from "usehooks-ts";

const ENDPOINT = "https://api.randorm.com/graphql/";

// Link to send the request to the GraphQL server
const httpLink = createHttpLink({
  uri: ENDPOINT,
});

// Link to retry failed requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
  },
});

// Link to add the JWT to the headers of each request
const addAuthLink = (token?: string) =>
  setContext((_, { headers }) => {
    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {};
    }
  });

// Link to log errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) =>
      console.log(
        `[GraphQL] Error: Message: ${message}, Location: ${
          JSON.stringify(
            locations,
          )
        }, Path: ${path}, Extensions: ${JSON.stringify(extensions)}`,
      )
    );
  }
  if (networkError) console.log(`[GraphQL] Network error: ${networkError}`);
});

// Hook to create a new Apollo client
export const useApolloClient = () => {
  const [authToken, setAuthToken] = useLocalStorage('token', undefined)
  const client = new ApolloClient({
    link: from([addAuthLink(authToken), errorLink, retryLink, httpLink]),
    cache: new InMemoryCache(),
  });
  return client;
};

// Export utilities and types
export { gql } from "./__codegen__/gql";
export * as types from "./__codegen__/graphql";
export * from "./__codegen__/index";

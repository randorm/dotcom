import { gql } from "@apollo/client";
export const GET_ME = gql(`
  query GetMe {
    me {
      id
      username
      views
    }
  }
`);

export const DISTRIBUTIONS = gql(`
  query {
    distributions {
      name
      state
    }
  }
`);
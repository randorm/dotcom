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

export const PROFILE = gql(`
query($userId: Int!) {
    user(userId: $userId) {
      profile {
        firstName
        lastName
        gender
        birthday
        bio
      }
    }
  }
`)
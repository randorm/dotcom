import { gql } from "@apollo/client";
export const GET_ME = gql(`
  query GetMe {
    me {
      id
      username
    }
  }
`);

export const DISTRIBUTIONS = gql(`
  query {
    distributions {
      id
      name
      state
    },
    me {
      id
      username
    },
    distributionCount
  }
`);

export const GET_DISTRIBUTION = gql(`
query($distributionId: Int!) {
    distribution(distributionId: $distributionId) {
      name
    },
    me {
      id
      username
    }
  }
`)

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
`);
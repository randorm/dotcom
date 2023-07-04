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
  query($userId: Int!) {
    distributions {
      id
      name
      state
    },
    user(userId: $userId) {
      profile {
        firstName
        lastName
      }
    },
    distributionCount
  }
`);

export const GET_DISTRIBUTION = gql(`
query($distributionId: Int!, $userId: Int!) {
    distribution(distributionId: $distributionId) {
      name
    },
    user(userId: $userId) {
      profile {
        firstName
        lastName
      }
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
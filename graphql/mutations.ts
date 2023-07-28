import { gql } from '@apollo/client';

export const CREATE_DISTRIBUTION = gql`
  mutation CreateDistribution($name: String!) {
    createDistribution(name: $name) {
      id
    } 
  }
`;

export const MARK_VIEWED = gql`
mutation MarkViewed($userId: Int!) {
  markViewed(userId: $userId) {
    user {
      id
    }
  }
}
`;

export const SUBSCRIBE = gql`
mutation Subscribe($userId: Int!) {
  subscribe(userId: $userId) {
    user {
      id
    }
  }
}
`;

export const UNSUBSCRIBE = gql`
mutation Mutation($userId: Int!) {
  unsubscribe(userId: $userId) {
    user {
      id
    }
  }
}
`;

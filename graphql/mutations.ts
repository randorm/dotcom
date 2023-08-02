import { gql } from "@apollo/client";

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
mutation Unsubscribe($userId: Int!) {
  unsubscribe(userId: $userId) {
    user {
      id
    }
  }
}
`;

export const UPDATE_DISTRIBUTION_FIELDS = gql`
mutation UpdateDistributionFields($distributionId: Int!, $fieldIds: [Int!]!) {
  updateDistributionFields(distributionId: $distributionId, fieldIds: $fieldIds) {
    fields {
      id
    }
  }
}
`;

export const CREATE_CHOICE_FIELD = gql`
mutation CreateChoiceField($required: Boolean!, $question: String!, $multiple: Boolean!, $options: [String!]!) {
  createChoiceField(required: $required, question: $question, multiple: $multiple, options: $options) {
    id
    type
    creator {
      id
    }
    required
    question
    multiple
    options
    answerCount
    createdAt
  }
}
`;

export const CREATE_TEXT_FIELD = gql`
mutation CreateTextField($required: Boolean!, $question: String!) {
  createTextField(required: $required, question: $question) {
    id
  }
}
`;

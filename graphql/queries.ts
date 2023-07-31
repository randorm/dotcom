import { gql } from "@apollo/client";
import exp from "constants";
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
query($distributionId: Int!) {
  distribution(distributionId: $distributionId) {
    id
    fieldCount
    name
    fields {
      type
      ... on ChoiceField {
        id
        question
        required
        options
        multiple
      }
      ... on TextField {
        id
        sample
        required
        question
        format
      }
    }
  },
  me {
    username
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

export const ME = gql(`
query Me {
  me {
    id
    username
  }
}
`);

export const FEED = gql(`
query($distributionId: Int!) {
  distribution(distributionId: $distributionId) {
    ...on GatheringDistribution {
      fields {
				...on ChoiceField {
          id
          question
        }
        ...on TextField {
          id
          question
        }
      }
  	}
  }
  recommend(distributionId: $distributionId) {
    id
    profile {
      firstName
      lastName
      gender
      birthday
      bio
    }
    answers {
      type
      ...on ChoiceAnswer {
        field {
          id
          question
          options
        }
        indices
      }
      ...on TextAnswer {
        field {
          id
          question
        }
        value
      }
    }
  }
}
`);

export const SUBSCRIPTIONS = gql(`
query Me {
  me {
    subscriptionCount
    subscriptions {
      id
      profile {
        firstName
        lastName
        gender
        birthday
        bio
      }
      answers {
        type
        ... on ChoiceAnswer {
          field {
            id
            question
            options
          }
          indices
        }
        ... on TextAnswer {
        field {
          id
          question
        }
        value
      }
      }
    }
  }
}
`);
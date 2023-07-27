import { gql } from "@apollo/client";

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

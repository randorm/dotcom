import { gql } from "@apollo/client";
import exp from "constants";

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
`)
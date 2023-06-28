import { gql, useMutation } from '@apollo/client';

export const CREATE_DISTRIBUTION = gql`
  mutation createDistribution($name: String!) {
    createDistribution(name: $name) {
      id
    } 
  }
`;
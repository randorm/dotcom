import { gql, useMutation } from '@apollo/client';

export const CREATE_DISTRIBUTION = gql`
  mutation CreateDistribution($name: String!) {
    createDistribution(name: $name) {
      id
    } 
  }
`;
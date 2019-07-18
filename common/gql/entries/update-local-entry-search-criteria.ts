import gql from 'graphql-tag';

export default gql`
  mutation updateLocalEntrySearchCriteria($queryVariable : Object!) {
    updateLocalEntrySearchCriteria(queryVariable: $queryVariable) @client
  }
`;

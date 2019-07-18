import gql from 'graphql-tag';

export default gql`
  query retrieveLocalEntrySearchCriteria {
    localEntrySearchCriteria @client {
      relatedEntryCriteriaMap
      queryVariable
      skip
      first
      count
    }
  }
`;

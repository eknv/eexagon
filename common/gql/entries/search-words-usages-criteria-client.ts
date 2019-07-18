import gql from 'graphql-tag';

export default gql`
  query searchWordsUsagesCriteriaClient {
    searchWordsUsagesCriteriaClient @client {
      term
      wordTypes
      languages
      isFavorite
      orderBy
      skip
      first
      count
    }
  }
`;

import gql from 'graphql-tag';
import WordUsageFragment from './word-usage-fragment';

export default gql`
  subscription searchWordsAndUsages(
    $term: String
    $wordTypes: [String!]!
    $languages: [String!]!
    $isFavorite: Boolean
    $orderBy: String
    $skip: Int
    $first: Int
  ) {
    searchWordsAndUsages(
      term: $term
      wordTypes: $wordTypes
      languages: $languages
      isFavorite: $isFavorite
      orderBy: $orderBy
      skip: $skip
      first: $first
    ) {
      count
      words {
        ...WordUsageFragment
      }
    }
  }
  ${WordUsageFragment}
`;

import gql from 'graphql-tag';

export default gql`
  mutation triggerLocalSearchWordsUsages($searchCriteria: Object!) {
    triggerLocalSearchWordsUsages(searchCriteria: $searchCriteria) @client
  }
`;

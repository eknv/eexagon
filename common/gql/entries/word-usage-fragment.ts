import gql from 'graphql-tag';

export default gql`
  fragment WordUsageFragment on Word {
    id
    content
    description
    usages {
      id
      content
      description
    }
  }
`;

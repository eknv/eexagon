import gql from 'graphql-tag';


export const EntryAttributeFields = `
    {
      id
      title
      description
      type
      mandatoryCondition
      displaySearchCondition
      scope {
        id
      }
      values {
        id
        value
        isDefault
      }
    }
`;

export const EntryRelationTypeFields = `
    {
      id
      value
      description
      scope {
        id
      }
    }
`;


export default gql`
  query loadParameters(
    $scope: String
  ) {
    loadParameters(
      scope: $scope
    ) {
    attributes
    ${EntryAttributeFields}
    entryRelationTypes
    ${EntryRelationTypeFields}
    }
  }
`;

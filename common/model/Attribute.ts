import Scope from './Scope';
import AttributeValue from './AttributeValue';

export default interface Attribute {
  id: string;
  title: string;
  description?: string;
  type: string;
  mandatoryCondition: string;
  displaySearchCondition: string;
  scope: Scope;
  values: AttributeValue[];
}

import Attribute from './Attribute';

export default interface AttributeValue {
  id: string;
  attribute: Attribute;
  value: string;
  isDefault?: string;
}

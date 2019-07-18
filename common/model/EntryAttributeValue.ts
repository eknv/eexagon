import Entry from './Entry';
import AttributeValue from './AttributeValue';

export default interface EntryAttributeValue {
  id: string;
  entry: Entry;
  attributeValue: AttributeValue;
}

import User from './User';
import EntryAttributeValue from './EntryAttributeValue';
import RelatedEntry from './RelatedEntry';

export default interface Entry {
  id: string;
  title: string;
  content: string;
  user: User
  attributeValues: [EntryAttributeValue]
  relatedEntriesFrom: [RelatedEntry]
  relatedEntriesTo: [RelatedEntry]
}

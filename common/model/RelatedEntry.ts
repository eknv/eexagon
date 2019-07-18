import Entry from './Entry';
import EntryRelationType from './EntryRelationType';

export default interface RelatedEntry {
  id: string;
  from: Entry;
  to: Entry;
  relationType: EntryRelationType;
}

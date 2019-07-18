

export interface IEntry {
  id: string;
  title: string;
  content: string;
  relatedEntriesFrom: IRelatedEntry[];
  attributeValues: IAttributeValueWrapper[];
}

export interface IRelatedEntry {
  to: IEntry;
}

export interface IAttributeValueWrapper {
  attributeValue: IAttributeValue;
}

export interface IAttributeValue {
  id: string;
  value: string;
}

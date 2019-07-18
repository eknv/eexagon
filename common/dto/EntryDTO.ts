import AttributeValueDTO from './AttributeValueDTO';

export default interface EntryDTO {
  level: number;
  term: string;
  attributeValues: AttributeValueDTO[];
}

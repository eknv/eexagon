import { Attribute } from "./model";


export const isMandatory = (attribute: Attribute): boolean => {
  return attribute.mandatoryCondition === 'true';
};




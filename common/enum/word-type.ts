

export interface IWordType {
  label: string;
}

export interface IWordTypes {
  [key: string]: IWordType;
  NOUN: IWordType;
  VERB: IWordType;
  ADJ: IWordType;
  ADV: IWordType;
  PRONOUN: IWordType;
  CON: IWordType;
}

/**
 * @deprecated
 */
export const WORD_TYPE: IWordTypes = Object.freeze({
  NOUN: {
    label: 'enum.wordtype-noun',
  },
  VERB: {
    label: 'enum.wordtype-verb',
  },
  ADJ: {
    label: 'enum.wordtype-adj',
  },
  ADV: {
    label: 'enum.wordtype-adv',
  },
  PRONOUN: {
    label: 'enum.wordtype-pronoun',
  },
  CON: {
    label: 'enum.wordtype-con',
  },
});

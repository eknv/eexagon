

export interface ILanguage {
  code: string;
  label: string;
}

export interface ILanguages {
  [key: string]: ILanguage;
  EN: ILanguage;
  DE: ILanguage;
  ES: ILanguage;
}

/**
 * @deprecated
 */
export const LANGUAGE: ILanguages = Object.freeze({
  EN: {
    code: 'en',
    label: 'enum.lang-en',
  },
  DE: {
    code: 'de',
    label: 'enum.lang-de',
  },
  ES: {
    code: 'es',
    label: 'enum.lang-es',
  },
})

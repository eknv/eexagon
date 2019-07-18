import { isNull, isArrayNull, isNullEmpty, isArrayNullEmpty, isArray } from './utils';

export function assertNotNull(obj: any, message: string) {
  if (isNull(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsNull(obj: any, message: string) {
  if (!isNull(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsArrayNull(obj: any, message: string) {
  if (!isArrayNull(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsArrayNotNull(obj: any, message: string) {
  if (isArrayNull(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsNullEmpty(obj: any, message: string) {
  if (!isNullEmpty(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsNotNullEmpty(obj: any, message: string) {
  if (isNullEmpty(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsArrayNullEmpty(obj: any, message: string) {
  if (!isArrayNullEmpty(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsArrayNotNullEmpty(obj: any, message: string) {
  if (isArrayNullEmpty(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsArray(obj: any, message: string) {
  if (!isArray(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertIsNotArray(obj: any, message: string) {
  if (isArray(obj)) {
    throw new Error(`#E ${message}`);
  }
};

export function assertCondition(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`#E ${message}`);
  }
};

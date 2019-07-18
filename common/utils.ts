export const defaults = (arg: any, defaultValue: any): any => {
  if (isNull(arg)) {
    return defaultValue
  }
  return arg;
}

export const defaultsObject = (arg: object, defaultValue: object): any => {
  if (isNullEmptyObject(arg)) {
    return defaultValue
  }
  return arg;
}

export const uniqueID = (): string => {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

export const uniqueAlphaID = (length: number): string => {
  const randomCharacters = [];
  const possibleCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  for (let i = 0; i < length; i++)
    randomCharacters.push(possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)]);

  return randomCharacters.join("");
}

export const isTrue = (arg: any): boolean => {
  if (isNull(arg)) {
    return false
  }
  if (isObject(arg) || isArray(arg)) {
    return false
  }
  if (isString(arg) && arg.trim.toLowerCase() === 'true') {
    return true;
  }
  return arg === true;
}

export const isNull = (arg: any): boolean => {
  if (arg == null || arg === 'undefined') {
    return true
  }
  return false
}


export const isNullEmpty = (arg: any): boolean => {
  return isNull(arg) || arg.trim().length === 0
}

export const isString = (arg: any): boolean => {
  return (typeof arg === 'string' || arg instanceof String)
}

export const isObject = (arg: any): boolean => {
  return !isNull(arg) && arg.constructor === Object;
}

export const isEmptyObject = (arg: any): boolean => {
  return isObject(arg) && Object.keys(arg).length === 0;
}

export const isNullEmptyObject = (arg: any): boolean => {
  return isNull(arg) || isEmptyObject(arg);
}

export const isArrayNull = (arg: any): boolean => {
  if (arg == null || typeof arg === 'undefined') {
    return true
  }
  return false
}

export const isArrayNullEmpty = (arg: any): boolean => {
  return isArrayNull(arg) || arg.length === 0
}

export const includes = (arg1: any, arg2: any): boolean => {
  if (isNullEmpty(arg1) || isNullEmpty(arg2)) {
    return true
  }
  return arg1.toUpperCase().includes(arg2.toUpperCase())
}

export const isArray = (data: any): boolean => {
  return (Object.prototype.toString.call(data) === "[object Array]");
}

export const asArray = <T>(data: T | T[]): T[] => {
  if (isNull(data)) {
    return [];
  } else if (!isArray(data)) {
    return [data as T]
  } else {
    return data as T[];
  }
}

export const firstArrayElement = <T>(data: T | T[]): T => {
  if (isNull(data)) {
    return null;
  } else if (!isArray(data)) {
    return data as T;
  } else if (isArrayNullEmpty(data)) {
    return null;
  } else {
    return (data as T[])[0];
  }
}

export const trimLowerCase = (data: string): string => {
  return !data ? data : data.toLowerCase().trim();
}

export const trimUpperCase = (data: string): string => {
  return !data ? data : data.toUpperCase().trim();
}

export const stringify = (objToJson: any): string => {
  return stringifyWithSeparator(objToJson, ',', 0);
}

export const stringifyWithSeparator = (objToJson: any, separator: any, counter?: any): string => {

  /**
   * counter to avoid stack-overflow
   */
  if (isNull(counter)) {
    counter = 0;
  }
  if (counter > 10) {
    console.log(`counter already reached: ${counter}`)
    return "......";
  }
  counter++;

  if (isNull(objToJson)) {
    return "null";
  }
  if (isString(objToJson)) {
    return objToJson;
  }
  separator = separator || ',';
  if (Array.isArray(objToJson)) {
    let props = objToJson
      .map(prop => `${stringifyWithSeparator(prop, separator, counter)}`)
      .join(`${separator}`);
    return `[${props}]`;
  }
  if (typeof objToJson !== "object") {
    // not an object, stringify using native function
    return JSON.stringify(objToJson);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object
    .keys(objToJson)
    .map(key => `${key}:${stringifyWithSeparator(objToJson[key], separator, counter)}`)
    .join(`${separator}`);
  return `{${props}}`;
}

/**
 * Convert a `Map` to a standard
 * JS object recursively.
 *
 * @param {Map} map to convert.
 * @returns {Object} converted object.
 */
export const mapToObject = (map: Map<any, any>) => {
  const out = Object.create(null)
  map.forEach((value, key) => {
    if (value instanceof Map) {
      out[key] = mapToObject(value)
    } else {
      out[key] = value
    }
  })
  return out
}

/**
 * Convert a standard JS object to a Map
 *
 * @param {Object} object to convert.
 * @returns {Map} converted map.
 */
export const objectToMap = (object: any) => {
  if (!isNull(object)) {
    return new Map(Object.entries(object));
  } else {
    return new Map();
  }
}

export const objectFieldsAsArray = (arg: any): string[] => {
  const objectFields: string[] = [];
  if (arg.constructor != Object || isEmptyObject(arg)) {
    return objectFields;
  }
  return Object.keys(arg);
}

export const objectHasField = (arg: any, fieldName: string): boolean => {
  if (arg.constructor != Object || isEmptyObject(arg)) {
    return false;
  }
  if (fieldName in arg) {
    return true;
  }
  return false;
}

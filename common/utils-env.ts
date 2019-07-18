import {isNull} from 'Common/utils';

/**
 * m- : prefix for mobile.. this is default because the react-native is not controlled by webpack
 * w- : prefix for web: is defined in webpack
 */
export const $prefix = (): string => {
  if (!isNull(process.env.TARGET_DEVICE) && process.env.TARGET_DEVICE === 'web') {
    return 'w-';
  } else {
    return 'm-';
  }
}


/**
 * m- : prefix for mobile.. this is default because the react-native is not controlled by webpack
 * w- : prefix for web: is defined in webpack
 */
export const isWeb = (): boolean => {
  if (!isNull(process.env.TARGET_DEVICE) && process.env.TARGET_DEVICE === 'web') {
    return true;
  } else {
    return false;
  }
}

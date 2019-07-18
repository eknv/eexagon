import {AsyncStorage} from 'react-native';

export const save = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const load = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    throw error;
  }
};

export const remove = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export const clear = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    throw error;
  }
};

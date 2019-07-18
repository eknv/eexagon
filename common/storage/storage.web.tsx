export const save = (key: string, value: any) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const load = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    throw error;
  }
};

export const remove = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export const clear = () => {
  try {
    return localStorage.clear();
  } catch (error) {
    throw error;
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import types from '../types/asyncStorage';

const storeInStorage = async (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};

const clearStorage = async () => {
  await AsyncStorage.clear();
};

const getTokenFromAS = async () => {
  const isLoggedIn = await getFromStorage(types.IS_LOGGED_IN);
  const isAccountVerified = await getFromStorage(
    types.IS_ACCOUNT_VERIFIED,
  );
  const accessToken = await getFromStorage(types.ACCESS_TOKEN);
  const refreshToken = await getFromStorage(types.REFRESH_TOKEN);

  return {
    isLoggedIn,
    isAccountVerified,
    accessToken,
    refreshToken,
  };
};

export {
  storeInStorage,
  getFromStorage,
  clearStorage,
  getTokenFromAS,
};

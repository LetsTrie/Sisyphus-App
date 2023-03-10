import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './authReducers';
import scaleReducer from './scaleReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  scale: persistReducer(persistConfig, scaleReducer),
});

import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './authReducers';
import scaleReducer from './scaleReducers';
import thoughtChallangeReducer from './thoughtChallangeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  scale: persistReducer(persistConfig, scaleReducer),
  thoughtChallange: persistReducer(
    persistConfig,
    thoughtChallangeReducer,
  ),
});

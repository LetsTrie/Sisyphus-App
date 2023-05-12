import {
  THOUGHT_CHALLANGE_1,
  THOUGHT_CHALLANGE_2,
  THOUGHT_CHALLANGE_3,
} from '../actions/types';

import { errorLog } from '../../helpers/log';
// import { latestScaleUpdate } from '../../services/scale';

const storeThoughtChallange1 = (accessToken, payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: THOUGHT_CHALLANGE_1, payload });
    } catch (error) {
      errorLog(error);
    }
  };
};

const storeThoughtChallange2 = (accessToken, payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: THOUGHT_CHALLANGE_2, payload });
    } catch (error) {
      errorLog(error);
    }
  };
};

const storeThoughtChallange3 = (accessToken, payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: THOUGHT_CHALLANGE_3, payload });
    } catch (error) {
      errorLog(error);
    }
  };
};

export {
  storeThoughtChallange1,
  storeThoughtChallange2,
  storeThoughtChallange3,
};

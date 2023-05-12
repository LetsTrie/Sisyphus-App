import { SIGN_IN, SIGN_OUT, ACCOUNT_VERIFIED } from './types';

export const loginAction = (payload) => (dispatch) => {
  dispatch({ type: SIGN_IN, payload });
};

export const accountVerifiedAction = () => (dispatch) => {
  dispatch({ type: ACCOUNT_VERIFIED });
};

export const logoutAction = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
};

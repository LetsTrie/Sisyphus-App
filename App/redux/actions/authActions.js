import { SIGN_IN, SIGN_OUT } from './types';

export const loginAction = (payload) => (dispatch) => {
  dispatch({ type: SIGN_IN, payload });
};

export const logoutAction = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
};

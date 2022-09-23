import {
  SIGN_IN,
  SIGN_OUT,
  ACCOUNT_VERIFIED,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isAccountVerified: false,

  accessToken: null,
  refreshToken: null,

  name: null,
  photoUrl: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        isAccountVerified: action.payload.isAccountVerified,

        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,

        name: action.payload.name,
        photoUrl: action.payload.photoUrl,
      };

    case SIGN_OUT:
      return { ...initialState };

    case ACCOUNT_VERIFIED:
      return {
        ...state,
        isAccountVerified: true,
      };

    default:
      return state;
  }
}

import { ASSESSMENT_LIST_RENDER } from '../actions/types';

const initialState = {
  progress: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ASSESSMENT_LIST_RENDER:
      return { ...state, progress: action.payload };

    default:
      return state;
  }
}

import {
  THOUGHT_CHALLANGE_1,
  THOUGHT_CHALLANGE_2,
  THOUGHT_CHALLANGE_3,
} from '../actions/types';

const initialState = {
  initialRating: 0,
  initialThinking: '',

  explainInAnotherPOV: '',
  finalThought: '',
  proveLeft: '',
  proveRight: '',
  changedRating: 0,

  advantagesWithThought: '',
  advantagesWithoutThought: '',
  disadvantagesWithThought: '',
  disadvantagesWithoutThought: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case THOUGHT_CHALLANGE_1:
    case THOUGHT_CHALLANGE_2:
    case THOUGHT_CHALLANGE_3:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

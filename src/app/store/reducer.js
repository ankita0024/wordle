// reducers.js
import { FETCH_WORDS_SUCCESS, FETCH_WORDS_FAILURE } from './actionTypes';

const initialState = {
  words: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORDS_SUCCESS:
      return { ...state, loading: false, words: action.payload };
    case FETCH_WORDS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default rootReducer;

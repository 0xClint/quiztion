import { ADD_QUESTIONS, ADD_SCORE, ADD_TOKEN } from "./action-types";

const initialState = {
  questionSet: [],
  score: 0,
  token: 0,
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTIONS: {
      return {
        ...state,
        questionSet: [...state.questionSet, action.data],
      };
    }
    case ADD_SCORE: {
      const { score } = action;
      return {
        ...state,
        score,
      };
    }
    case ADD_TOKEN: {
      const { token } = action;
      return {
        ...state,
        token,
      };
    }

    default:
      return state;
  }
};

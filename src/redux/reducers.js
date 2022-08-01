import { ADD_QUESTIONS, ADD_SCORE } from "./action-types";

const initialState = {
  questionSet: [],
  score: "11",
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
      console.log(action);
      const { score } = action;
      return {
        ...state,
        score,
      };
    }

    default:
      return state;
  }
};

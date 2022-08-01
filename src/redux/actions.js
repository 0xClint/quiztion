import { ADD_QUESTIONS, ADD_SCORE } from "./action-types";

export const addQuestions = (data) => {
  console.log(data);
  return {
    type: ADD_QUESTIONS,
    data,
  };
};

export const addScore = (score) => {
  console.log(score);
  return {
    type: ADD_SCORE,
    score,
  };
};

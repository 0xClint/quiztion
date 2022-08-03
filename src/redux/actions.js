import { ADD_QUESTIONS, ADD_SCORE, ADD_TOKEN } from "./action-types";

export const addQuestions = (data) => {
  return {
    type: ADD_QUESTIONS,
    data,
  };
};

export const addScore = (score) => {
  return {
    type: ADD_SCORE,
    score,
  };
};

export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    token,
  };
};

import { combineReducers, createStore } from "redux";
import { questionReducer } from "./reducers";

const reducer = combineReducers({
  questionSet: questionReducer,
});

const initialState = {};

const store = createStore(reducer, initialState);

export default store;

import { combineReducers } from "redux";
import toDoListReducer from "./toDoListReducer";

export const rootReducer = combineReducers({
  toDoListReducer,
});

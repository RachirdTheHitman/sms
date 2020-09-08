import { combineReducers } from "redux";
import keyReducer from "./keyReducer";
import messageReducer from "./messageReducer";
import countReducer from "./countReducer";
import balanceReducer from "./balanceReducer";

export default combineReducers({
  keyReducer,
  messageReducer,
  countReducer,
  balanceReducer
});

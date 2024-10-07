import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signUpSlice";
import loginSlice from "./features/loginSlice";

const rootReducer = combineReducers({
  signUp: signUpSlice.reducer,
  login: loginSlice.reducer,
});

export default rootReducer;

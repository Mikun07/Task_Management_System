import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signUpSlice";
import loginSlice from "./features/loginSlice";
import getUserSlice from "./features/getUserSlice";
import createTaskSlice from "./features/CreateTaskSlice";

const rootReducer = combineReducers({
  signUp: signUpSlice.reducer,
  login: loginSlice.reducer,
  getUser: getUserSlice.reducer,
  createTask: createTaskSlice.reducer
});

export default rootReducer;

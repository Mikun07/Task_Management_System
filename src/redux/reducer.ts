import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signUpSlice";
import loginSlice from "./features/loginSlice";
import getUserSlice from "./features/getUserSlice";
import createTaskSlice from "./features/CreateTaskSlice";
import getTaskSlice from "./features/getTaskSlice";

const rootReducer = combineReducers({
  signUp: signUpSlice?.reducer,
  login: loginSlice?.reducer,
  getUser: getUserSlice?.reducer,
  createTask: createTaskSlice?.reducer,
  getTask: getTaskSlice?.reducer,
});

export default rootReducer;

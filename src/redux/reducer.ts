import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signUpSlice";
import loginSlice from "./features/loginSlice";
import getUserSlice from "./features/getUserSlice";
import getTaskSlice from "./features/getTaskSlice";
import editTaskSlice from "./features/EditTaskSlice";
import getAllUserSlice from "./features/getAllUserSlice";
import deleteTaskSlice from "./features/deleteTaskSlice";
import createTaskSlice from "./features/createTaskSlice";

const rootReducer = combineReducers({
  signUp: signUpSlice?.reducer,
  login: loginSlice?.reducer,
  getUser: getUserSlice?.reducer,
  getAllUser: getAllUserSlice?.reducer,
  createTask: createTaskSlice?.reducer,
  getTask: getTaskSlice?.reducer,
  editTask: editTaskSlice?.reducer,
  removeTask: deleteTaskSlice?.reducer,
});

export default rootReducer;

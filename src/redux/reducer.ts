import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signUpSlice";
import loginSlice from "./features/loginSlice";
import getUserSlice from "./features/getUserSlice";
import getTaskSlice from "./features/getTaskSlice";
import editTaskSlice from "./features/EditTaskSlice";
import getAllUserSlice from "./features/getAllUserSlice";
import deleteTaskSlice from "./features/deleteTaskSlice";
import inviteUserSlice from "./features/inviteUserSlice";
import createTaskSlice from "./features/createTaskSlice";
import getBoardSlice from "./features/getBoardSlice";

const rootReducer = combineReducers({
  signUp: signUpSlice?.reducer,
  login: loginSlice?.reducer,
  getUser: getUserSlice?.reducer,
  getAllUser: getAllUserSlice?.reducer,
  createTask: createTaskSlice?.reducer,
  getTask: getTaskSlice?.reducer,
  editTask: editTaskSlice?.reducer,
  removeTask: deleteTaskSlice?.reducer,
  sendInvite: inviteUserSlice?.reducer,
  getBoard: getBoardSlice?.reducer,
});

export default rootReducer;

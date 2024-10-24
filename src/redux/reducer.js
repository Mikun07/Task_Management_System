import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signUpSlice";
import loginSlice from "./features/loginSlice";
import getUserSlice from "./features/getUserSlice";
import getTaskSlice from "./features/getTaskSlice";
import editTaskSlice from "./features/EditTaskSlice";
import getAllUserSlice from "./features/getAllUserSlice";
import deleteTaskSlice from "./features/deleteTaskSlice";
import inviteUserSlice from "./features/inviteUserSlice";
import getBoardSlice from "./features/getBoardSlice";
import getInviteTaskSlice from "./features/getInviteTaskSlice";
import inviteCreateTaskSlice from "./features/inviteCreateTaskSlice";
import createTaskSlice from "./features/CreateTaskSlice";
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
    getInviteTask: getInviteTaskSlice?.reducer,
    inviteCreateTask: inviteCreateTaskSlice?.reducer,
});
export default rootReducer;

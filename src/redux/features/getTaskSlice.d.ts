import { TaskState } from "../root";
export declare const fetchTask: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const getTaskSlice: import("@reduxjs/toolkit").Slice<TaskState, {}, "task", "task", import("@reduxjs/toolkit").SliceSelectors<TaskState>>;
export default getTaskSlice;

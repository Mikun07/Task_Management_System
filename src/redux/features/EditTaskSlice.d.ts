import { TaskState } from "../root";
interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
    assigned_to: string;
    deadline: string;
    description: string;
}
export declare const updateTask: import("@reduxjs/toolkit").AsyncThunk<any, Task, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const editTaskSlice: import("@reduxjs/toolkit").Slice<TaskState, {}, "editTask", "editTask", import("@reduxjs/toolkit").SliceSelectors<TaskState>>;
export default editTaskSlice;

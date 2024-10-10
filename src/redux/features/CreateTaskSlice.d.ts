interface createTaskPayload {
    title: string;
    description: string;
    deadline: string;
    priority: string;
    status: string;
    assigned_to: string;
}
export declare const makeTask: import("@reduxjs/toolkit").AsyncThunk<any, createTaskPayload, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const createTaskSlice: import("@reduxjs/toolkit").Slice<{
    data: any;
    success: boolean;
    error: any;
    loading: boolean;
}, {}, "createTask", "createTask", import("@reduxjs/toolkit").SliceSelectors<{
    data: any;
    success: boolean;
    error: any;
    loading: boolean;
}>>;
export default createTaskSlice;

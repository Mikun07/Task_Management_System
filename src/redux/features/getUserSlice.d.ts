export declare const fetchUser: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const getUserSlice: import("@reduxjs/toolkit").Slice<{
    data: any;
    success: boolean;
    error: any;
    loading: boolean;
}, {}, "user", "user", import("@reduxjs/toolkit").SliceSelectors<{
    data: any;
    success: boolean;
    error: any;
    loading: boolean;
}>>;
export default getUserSlice;

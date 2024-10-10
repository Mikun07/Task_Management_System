import { LoginState } from "../redux/root";
interface loginPayload {
    username: string;
    password: string;
}
export declare const postLogin: import("@reduxjs/toolkit").AsyncThunk<{
    data: unknown;
    status: number;
}, loginPayload, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const loginSlice: import("@reduxjs/toolkit").Slice<import("immer").WritableDraft<LoginState>, {
    logout: (state: import("immer").WritableDraft<LoginState>) => void;
}, "login", "login", import("@reduxjs/toolkit").SliceSelectors<import("immer").WritableDraft<LoginState>>>;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"login/logout">;
export default loginSlice;

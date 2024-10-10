import { BaseState } from "../redux/root";
interface SignUpPayload {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    role: string;
}
export declare const postSignUp: import("@reduxjs/toolkit").AsyncThunk<any, SignUpPayload, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare const signUpSlice: import("@reduxjs/toolkit").Slice<import("immer").WritableDraft<BaseState>, {
    resetSuccess: (state: import("immer").WritableDraft<BaseState>) => void;
}, "signup", "signup", import("@reduxjs/toolkit").SliceSelectors<import("immer").WritableDraft<BaseState>>>;
export default signUpSlice;

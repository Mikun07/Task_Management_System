declare const rootReducer: import("redux").Reducer<{
    signUp: import("immer").WritableDraft<import("../redux/root").BaseState>;
    login: import("immer").WritableDraft<import("../redux/root").LoginState>;
    getUser: {
        data: any;
        success: boolean;
        error: any;
        loading: boolean;
    };
    createTask: {
        data: any;
        success: boolean;
        error: any;
        loading: boolean;
    };
}, import("redux").UnknownAction, Partial<{
    signUp: import("immer").WritableDraft<import("../redux/root").BaseState>;
    login: import("immer").WritableDraft<import("../redux/root").LoginState>;
    getUser: {
        data: any;
        success: boolean;
        error: any;
        loading: boolean;
    };
    createTask: {
        data: any;
        success: boolean;
        error: any;
        loading: boolean;
    };
}>>;
export default rootReducer;

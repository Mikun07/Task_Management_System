declare const rootReducer: import("redux").Reducer<{
    signUp: import("immer").WritableDraft<import("./root").BaseState>;
    login: import("immer").WritableDraft<import("./root").LoginState>;
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
    getTask: import("./root").TaskState;
    editTask: import("./root").TaskState;
}, import("redux").UnknownAction, Partial<{
    signUp: import("immer").WritableDraft<import("./root").BaseState>;
    login: import("immer").WritableDraft<import("./root").LoginState>;
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
    getTask: import("./root").TaskState;
    editTask: import("./root").TaskState;
}>>;
export default rootReducer;

declare const store: import("@reduxjs/toolkit").EnhancedStore<{
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
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
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
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

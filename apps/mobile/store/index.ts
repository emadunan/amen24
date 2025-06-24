import { configureStore } from "@reduxjs/toolkit";
import RtlReducer from "./slices/rtlSlice";
import { authApi } from "./apis/authApi";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      rtl: RtlReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
  });

  return store;
}

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];




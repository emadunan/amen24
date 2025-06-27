import { configureStore } from "@reduxjs/toolkit";
import RtlReducer from "./slices/rtlSlice";
import { authApi } from "./apis/authApi";
import { favoriteApi } from "./apis/favoriteApi";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      rtl: RtlReducer,
      [authApi.reducerPath]: authApi.reducer,
      [favoriteApi.reducerPath]: favoriteApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(favoriteApi.middleware)
  });

  return store;
}

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];




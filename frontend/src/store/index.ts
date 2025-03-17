import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import searchReducer from "./searchSlice";
import navigatorReducer from "./navigatorSlice";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      navigator: navigatorReducer,
      search: searchReducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

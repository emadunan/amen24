import { configureStore } from "@reduxjs/toolkit";
import navigatorReducer from "./navigatorSlice";
import searchReducer from "./searchSlice";
import { bookmarkApi } from "./bookmarkApi";
import { favoriteApi } from "./favoriteApi";
import { userApi } from "./userApi";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      navigator: navigatorReducer,
      search: searchReducer,
      [userApi.reducerPath]: userApi.reducer,
      [bookmarkApi.reducerPath]: bookmarkApi.reducer,
      [favoriteApi.reducerPath]: favoriteApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(bookmarkApi.middleware)
        .concat(favoriteApi.middleware)
  });

  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

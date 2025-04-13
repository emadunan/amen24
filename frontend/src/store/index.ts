import { configureStore } from "@reduxjs/toolkit";
import navigatorReducer from "./navigatorSlice";
import searchReducer from "./searchSlice";
import { featuredApi } from "./featuredApi";
import { favoriteApi } from "./favoriteApi";
import { bookmarkApi } from "./bookmarkApi";
import { userApi } from "./userApi";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      navigator: navigatorReducer,
      search: searchReducer,
      [userApi.reducerPath]: userApi.reducer,
      [bookmarkApi.reducerPath]: bookmarkApi.reducer,
      [favoriteApi.reducerPath]: favoriteApi.reducer,
      [featuredApi.reducerPath]: featuredApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(bookmarkApi.middleware)
        .concat(favoriteApi.middleware)
        .concat(featuredApi.middleware)
  });

  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

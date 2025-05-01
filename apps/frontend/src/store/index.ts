import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./slices/translationSlice";
import navigatorReducer from "./slices/navigatorSlice";
import searchReducer from "./slices/searchSlice";
import { userApi } from "./apis/userApi";
import { authApi } from "./apis/authApi";
import { bookmarkApi } from "./apis/bookmarkApi";
import { favoriteApi } from "./apis/favoriteApi";
import { featuredApi } from "./apis/featuredApi";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      translation: translationReducer,
      navigator: navigatorReducer,
      search: searchReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [bookmarkApi.reducerPath]: bookmarkApi.reducer,
      [favoriteApi.reducerPath]: favoriteApi.reducer,
      [featuredApi.reducerPath]: featuredApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(bookmarkApi.middleware)
        .concat(favoriteApi.middleware)
        .concat(featuredApi.middleware),
  });

  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

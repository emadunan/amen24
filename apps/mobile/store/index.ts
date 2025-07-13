import { configureStore } from "@reduxjs/toolkit";
import rtlReducer from "./slices/rtlSlice";
import networkReducer from "./slices/networkSlice";

import { authApi } from "./apis/authApi";
import { favoriteApi } from "./apis/favoriteApi";
import { featuredApi } from "./apis/featuredApi";
import { progressApi } from "./apis/progressApi";
import { glossaryApi } from "./apis/glossaryApi";
import { libraryApi } from "./apis/libraryApi";
import { setStore } from "./storeRef";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      rtl: rtlReducer,
      network: networkReducer,
      [authApi.reducerPath]: authApi.reducer,
      [favoriteApi.reducerPath]: favoriteApi.reducer,
      [featuredApi.reducerPath]: featuredApi.reducer,
      [progressApi.reducerPath]: progressApi.reducer,
      [glossaryApi.reducerPath]: glossaryApi.reducer,
      [libraryApi.reducerPath]: libraryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(favoriteApi.middleware)
        .concat(featuredApi.middleware)
        .concat(progressApi.middleware)
        .concat(glossaryApi.middleware)
        .concat(libraryApi.middleware),
  });

  setStore(store);
  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

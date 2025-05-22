import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi'
import { verseApi } from './verseApi';
import { profileApi } from './profileApi';
import { featuredApi } from "./featuredApi";
import { auditingApi } from './auditingApi';
import { glossaryApi } from './glossaryApi';

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [verseApi.reducerPath]: verseApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [glossaryApi.reducerPath]: glossaryApi.reducer,
      [featuredApi.reducerPath]: featuredApi.reducer,
      [auditingApi.reducerPath]: auditingApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
        .concat(glossaryApi.middleware)
        .concat(featuredApi.middleware)
        .concat(verseApi.middleware)
        .concat(auditingApi.middleware)
  });

  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
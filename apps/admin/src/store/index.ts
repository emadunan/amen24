import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import { userApi } from './userApi';

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
  });

  return store;
};

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
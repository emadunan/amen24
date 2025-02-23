import { configureStore } from '@reduxjs/toolkit';
import { profileApi } from "./profileSlice";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware)
  });

  return store;
}

export type AppStore = ReturnType<typeof MakeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./slices/translationSlice";
import audioPlayerReducer from "./slices/audioPlayerSlice";
import navigatorReducer from "./slices/navigatorSlice";
import searchReducer from "./slices/searchSlice";
import { userApi } from "./apis/userApi";
import { authApi } from "./apis/authApi";
import { verseApi } from "./apis/verseApi";
import { progressApi } from "./apis/progressApi";
import { favoriteApi } from "./apis/favoriteApi";
import { featuredApi } from "./apis/featuredApi";
import { profileApi } from "./apis/profileApi";
import { glossaryApi } from "./apis/glossaryApi";

export const MakeStore = () => {
  const store = configureStore({
    reducer: {
      translation: translationReducer,
      audioPlayer: audioPlayerReducer,
      navigator: navigatorReducer,
      search: searchReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [verseApi.reducerPath]: verseApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [glossaryApi.reducerPath]: glossaryApi.reducer,
      [progressApi.reducerPath]: progressApi.reducer,
      [favoriteApi.reducerPath]: favoriteApi.reducer,
      [featuredApi.reducerPath]: featuredApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(verseApi.middleware)
        .concat(profileApi.middleware)
        .concat(glossaryApi.middleware)
        .concat(progressApi.middleware)
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

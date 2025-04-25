import { Lang } from "@amen24/shared";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TranslationState {
  lang: Lang;
}

const initialState: TranslationState = {
  lang: Lang.VOID,
};

export const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    setTranslationLang: (state, action: PayloadAction<Lang>) => {
      console.log("TargetLang: ", action.payload);

      state.lang = action.payload;
    },
  },
});

export const { setTranslationLang } = translationSlice.actions;

export default translationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface NavigatorState {
  isOpen: boolean;
}

const initialState: NavigatorState = {
  isOpen: false,
};

export const navigatorSlice = createSlice({
  name: "navigator",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open, close, toggle } = navigatorSlice.actions;

export default navigatorSlice.reducer;

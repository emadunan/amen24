// store/networkSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isConnected: true };

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setConnectionStatus(state, action) {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnectionStatus } = networkSlice.actions;
export default networkSlice.reducer;

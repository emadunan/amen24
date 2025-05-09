import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface AudioPlayerState {
  isOpen: boolean;
  title: string;
}

const initialState: AudioPlayerState = {
  isOpen: false,
  title: "",
};

export const audioPlayerSlice = createSlice({
  name: "audioPlayer",
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
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { open, close, toggle } = audioPlayerSlice.actions;

export const selectAudioPlayer = (state: RootState) => state.audioPlayer.isOpen;

export default audioPlayerSlice.reducer;

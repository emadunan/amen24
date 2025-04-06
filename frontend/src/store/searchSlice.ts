import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookKey, Verse, VerseResult } from "@amen24/shared";

// Define a type for the slice state
interface SearchState {
  query: string;
  selectedBooks: string[];
  showDropdown: boolean;
  results: VerseResult[];
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: SearchState = {
  query: "",
  selectedBooks: Object.values(BookKey),
  showDropdown: false,
  results: [],
  isLoading: false,
};

export const searchSlice = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedBooks: (state, action: PayloadAction<string[]>) => {
      state.selectedBooks = action.payload;
    },
    toggleDropdown: (state) => {
      state.showDropdown = !state.showDropdown;
    },
    setResults: (state, action: PayloadAction<VerseResult[]>) => {
      state.results = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setQuery,
  setIsLoading,
  setSelectedBooks,
  setResults,
  toggleDropdown,
} = searchSlice.actions;

export default searchSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookKey, VerseResult } from "@amen24/shared";

// Define a type for the slice state
interface SearchState {
  query: string;
  queryTerms: string[];
  selectedBooks: string[];
  showDropdown: boolean;
  results: VerseResult[];
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: SearchState = {
  query: "",
  queryTerms: [],
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
    setQueryTerms: (state, action: PayloadAction<string[]>) => {
      state.queryTerms = action.payload;
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
  setQueryTerms,
  setIsLoading,
  setSelectedBooks,
  setResults,
  toggleDropdown,
} = searchSlice.actions;

export default searchSlice.reducer;

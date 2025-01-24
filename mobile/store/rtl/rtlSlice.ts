import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define a type for the slice state
export interface RtlState {
  isRtl: boolean
}

// Define the initial state using that type
const initialState: RtlState = {
  isRtl: false
}

export const RtlSlice = createSlice({
  name: 'Rtl',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleRtl: state => {
      state.isRtl = !state.isRtl;
    },
    setRtl: (state, action: PayloadAction<boolean>) => {
      state.isRtl = action.payload;
    }
  }
})

export const { toggleRtl, setRtl } = RtlSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsRtl = (state: RootState) => state.rtl

export default RtlSlice.reducer;
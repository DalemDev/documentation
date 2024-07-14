import { createSlice } from "@reduxjs/toolkit";

export const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    value: {
      documentaciones: [],
      soportes: []
    }
  },
  reducers: {
    addDocuments: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      };
    }
  }
})

export const { addDocuments } = documentSlice.actions;

export default documentSlice.reducer;

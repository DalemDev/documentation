import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "../reducers/documentSlice";

export default configureStore({
  reducer: {
    documents: documentReducer
  }
})
import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../features/content/contentSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    comments: commentsReducer
  }
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (thunkAPI) => {
    const response = await fetch(
      "https://dummyjson.com/comments"
    ).then((data) => data.json());
    return response.comments;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    isError: false,
    comments: []
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.comments = action.payload.map((comm) => ({
        id: comm.id,
        body: comm.body,
        postId: comm.postId,
        userId: comm.user.id,
        userName: comm.user.username
      }));
    },
    [getComments.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const selectComments = (state) => state.comments.comments;
export const selectCommentStatus = (state) => ({
  isCommentsLoading: state.comments.isLoading,
  isCommentsError: state.comments.isError
});
export const clearComments = commentsSlice.actions.clearComments;

export default commentsSlice.reducer;

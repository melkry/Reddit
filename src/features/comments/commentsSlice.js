import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (permalink, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com${permalink}.json`
    ).then((data) => data.json());
    return response[1].data.children;
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
        id: comm.data.id,
        body: comm.data.body,
        postId: comm.data.parent_id.slice(3),
        userId: comm.data.author_fullname,
        userName: comm.data.author,
        score: comm.data.score
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

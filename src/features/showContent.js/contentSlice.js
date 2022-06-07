import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { entries } from "../../../forTesting";

export const fetchPosts = createAsyncThunk(
  "content/fetchPosts",
  async (term) => {
    //const response = await fetch('https://www.reddit.com/search.json?q='+term+'&limit=20');
    //const jsonResponse = await response.json();
    //return jsonResponse.data.children;
    const response = await fetch(entries);
    return response;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    isLoading: false,
    isError: false,
    content: []
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.content = action.payload.map((thing) => ({
        title: thing.title,
        author: thing.author,
        upvotes: thing.upvotes,
        isVideo: thing.isVideo,
        numComments: thing.numComments,
        createdDate: thing.createdDate,
        isSelf: thing.isSelf,
        url: thing.url,
        forAdults: thing.forAdults,
        permalink: thing.permalink,
        selftext: thing.selftext,
        media: thing.media
      }));
    },
    [fetchPosts.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const selectContent = (state) => state.content.content;

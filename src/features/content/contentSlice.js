import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const redditAPI = createAsyncThunk(
  "content/redditAPI",
  async (subrInfo = { subreddit: "all", listing: "hot" }, thunkAPI) => {
    const { subreddit, listing } = subrInfo;
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/${listing}.json?limit=10`
    ).then((data) => data.json());
    return response.data.children;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    currentSubr: "all",
    contents: []
  },
  reducers: {
    changeCurrentSubr: (state, action) => {
      state.currentSubr = action.payload;
    }
  },
  extraReducers: {
    [redditAPI.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoaded = false;
    },
    [redditAPI.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoaded = true;
      state.contents = action.payload.map((thing) => ({
        id: thing.data.id,
        subreddit: `r/${thing.data.subreddit}`,
        title: thing.data.title,
        author: thing.data.author,
        isVideo: thing.data.isVideo,
        numComments: thing.data.num_comments,
        isSelf: thing.data.is_self,
        url: thing.data.url,
        forAdults: thing.data.over_18,
        permalink: thing.data.permalink,
        selftext: thing.data.selftext,
        thumbnail: thing.data.thumbnail,
        height: thing.data.thumbnail_height,
        width: thing.data.thumbnail_width,
        video: thing.data.url_overridden_by_dest,
        score: thing.data.score
      }));
    },
    [redditAPI.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const changeCurrentSubr = contentSlice.actions.changeCurrentSubr;

export const selectContents = (state) => state.content.contents;
export const selectStatus = (state) => ({
  isLoading: state.content.isLoading,
  isLoaded: state.content.isLoaded,
  isError: state.content.isError
});

export const selectCurrentSubr = (state) => state.content.currentSubr;

export default contentSlice.reducer;

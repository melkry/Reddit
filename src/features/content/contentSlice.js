import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const testAPI = createAsyncThunk("content/testAPI", async (thunkAPI) => {
  const response = await fetch(
    "https://api.imgflip.com/get_memes"
  ).then((data) => data.json());
  return response.data.memes;
});

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    contents: []
  },
  reducers: {},
  extraReducers: {
    [testAPI.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoaded = false;
    },
    [testAPI.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoaded = true;
      state.contents = action.payload.map((meme) => ({
        /*title: child.data.title,
        author: child.data.author,
        upvotes: child.data.ups,
        isVideo: child.data.is_video,
        numComments: child.data.num_comments,
        createdDate: child.data.created,
        isSelf: child.data.is_self,
        url: child.data.url,
        forAdults: child.data.over_18,
        permalink: child.data.permalink,
        selftext: child.data.selftext,
        media: child.data.media*/
        id: meme.id,
        subreddit: "r/all",
        title: meme.name,
        author: "iamnotacat11",
        upvotes: "Upvotes",
        isVideo: false,
        numComments: 69,
        createdDate: "6/11/1999",
        isSelf: false,
        url: "http://google.com",
        forAdults: false,
        permalink: "http://google.com",
        selftext: "The description will be here if this is a selfpost.",
        thumbnail: meme.url,
        media: meme.url,
        score: 69
      }));
    },
    [testAPI.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoaded = false;
    }
  }
});

export const selectContents = (state) => state.content.contents;
export const selectStatus = (state) => ({
  isLoading: state.content.isLoading,
  isLoaded: state.content.isLoaded,
  isError: state.content.isError
});

export default contentSlice.reducer;

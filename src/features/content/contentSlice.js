import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const testAPI = createAsyncThunk(
  "content/testAPI",
  async (endpoint = "products", thunkAPI) => {
    const response = await fetch(
      `https://fakestoreapi.com/${endpoint}`
    ).then((data) => data.json());
    return response;
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
    [testAPI.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoaded = false;
    },
    [testAPI.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoaded = true;
      state.contents = action.payload.map((thing) => ({
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
        id: thing.id,
        subreddit: `r/${thing.category}`,
        title: thing.title,
        author: "iamnotacat11",
        upvotes: "Upvotes",
        isVideo: false,
        numComments: 69,
        createdDate: "2h",
        isSelf: false,
        url: "http://google.com",
        forAdults: false,
        permalink: "http://google.com",
        selftext: thing.description,
        thumbnail: thing.image,
        media: thing.url,
        score: "10"
      }));
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

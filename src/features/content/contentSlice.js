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
    contents: [{ id: "id", name: "default_name", url: "url" }]
  },
  reducers: {},
  extraReducers: {
    [testAPI.pending]: (state) => {
      console.log("pending");
      state.isLoading = true;
      state.isError = false;
      state.isLoaded = false;
    },
    [testAPI.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isLoaded = true;
      state.contents = action.payload.map((meme) => ({
        id: meme.id,
        name: meme.name,
        url: meme.url
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

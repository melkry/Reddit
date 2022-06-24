import { createSlice } from "@reduxjs/toolkit";
import { light, dark } from "./themes.js";

export const themesSlice = createSlice({
  name: "themes",
  initialState: {
    currentTheme: ""
  },
  reducers: {
    changeTheme: (state, action) => {
      switch (action.payload) {
        case "light":
          for (let className in light) {
            const classNameStr = String(className);
            const elements = document.getElementsByClassName(classNameStr);
            for (var i = 0; i < elements.length; i++) {
              elements[i].style.backgroundColor = light[className];
            }
          }
          state.currentTheme = "light";
          break;
        case "dark":
          for (let className in dark) {
            const classNameStr = String(className);
            const elements = document.getElementsByClassName(classNameStr);
            for (var i = 0; i < elements.length; i++) {
              elements[i].style.backgroundColor = dark[className];
            }
          }
          state.currentTheme = "dark";
          break;
        default:
          console.log("Not a theme.");
      }
    }
  }
});

export const selectCurrentTheme = (state) => state.currentTheme;
export const changeTheme = themesSlice.actions.changeTheme;

export default themesSlice.reducer;

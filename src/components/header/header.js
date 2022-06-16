import React from "react";
import "./header.css";
import { useDispatch } from "react-redux";
import { testAPI } from "../../features/content/contentSlice";
import { changeCurrentSubr } from "../../features/content/contentSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = document.getElementById("searchBar").value;
    dispatch(testAPI(`products/category/${search}`));
    dispatch(changeCurrentSubr(search));
  };

  return (
    <div className="header color_four">
      <img
        alt="reddit logo"
        src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
      />
      <input
        id="searchBar"
        type="text"
        className="searchBar color_four"
        placeholder="Enter Subreddit"
      />
      <button
        className="submit color_five addHover"
        type="button"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

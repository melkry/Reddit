import React from "react";
import "./header.css";

export const Header = () => {
  return (
    <div className="header">
      <img
        alt="reddit logo"
        src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
      />
      <div className="searchBar"></div>
      <div className="searchButton"></div>
    </div>
  );
};

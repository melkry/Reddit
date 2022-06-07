import React from "react";
import "./content.css";
import { useSelector } from "react-redux";
import { selectContents } from "../../features/content/contentSlice";
import { selectStatus } from "../../features/content/contentSlice";

export const Content = () => {
  const contents = useSelector(selectContents);
  const { isLoading, isError, isLoaded } = useSelector(selectStatus);
  let status = isLoading ? "loading!" : "not loading...";
  status += isError ? "error..." : "no error..";
  status += isLoaded ? "loaded!" : "not loaded :(";
  return (
    <div className="content">
      <p>{status}</p>
      {contents.map((meme) => {
        return <p key={meme.id}>{meme.name}</p>;
      })}
    </div>
  );
};

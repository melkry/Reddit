import React, { useEffect } from "react";
import "./content.css";
import { useDispatch, useSelector } from "react-redux";
import { selectContents } from "../../features/content/contentSlice";
import { selectStatus } from "../../features/content/contentSlice";
import { testAPI } from "../../features/content/contentSlice";

export const Content = () => {
  const dispatch = useDispatch();
  const contents = useSelector(selectContents);
  const { isLoading, isError } = useSelector(selectStatus);

  useEffect(() => {
    dispatch(testAPI());
  }, [dispatch]);

  return (
    <div className="content">
      <div className="title">
        <p>Hot</p>
        <p>New</p>
        <p>Top</p>
      </div>
      {isLoading ? <p>Loading content...</p> : null}
      {isError ? <p>Error! Check your connection...</p> : null}
      <div className="posts">
        {contents.map((meme) => {
          return (
            <div className="content-container" key={meme.id}>
              <div className="post-upvote">^ {meme.score} v</div>
              <div className="post-content">
                <h2 id="title">{meme.title}</h2>
                {meme.isSelf ? (
                  <p id="selftext">{meme.selftext}</p>
                ) : (
                  <img alt="media" id="media" src={meme.thumbnail} />
                )}
                <div id="details">
                  <p id="subreddit">{meme.subreddit}</p>
                  <p id="author">{meme.author}</p>
                  <p id="date">{meme.createdDate}</p>
                  <p id="numComments">{meme.numComments}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import "./content.css";
import { useDispatch, useSelector } from "react-redux";
import { selectContents } from "../../features/content/contentSlice";
import { selectStatus } from "../../features/content/contentSlice";
import { testAPI } from "../../features/content/contentSlice";
import { selectCurrentSubr } from "../../features/content/contentSlice";
import { getComments } from "../../features/comments/commentsSlice";
import { selectComments } from "../../features/comments/commentsSlice";
import { clearComments } from "../../features/comments/commentsSlice";

export const Content = () => {
  const dispatch = useDispatch();
  const contents = useSelector(selectContents);
  const currentSubr = useSelector(selectCurrentSubr);
  const comments = useSelector(selectComments);
  const { isLoading, isError } = useSelector(selectStatus);

  const renderComments = () => {
    if (comments[0]) {
      dispatch(clearComments());
    } else {
      dispatch(getComments());
    }
  };

  const hideComment = (e) => {
    const commEl = e.target.parentElement;
    if (commEl.classList.contains("hidden")) {
      commEl.classList.remove("hidden");
    } else {
      commEl.classList.add("hidden");
    }
  };

  useEffect(() => {
    dispatch(testAPI());
  }, [dispatch]);

  return (
    <div className="content color_four">
      <div className="subrTitle">
        <h2>r/{currentSubr}</h2>
      </div>
      <div className="title color_five">
        <p id="hot">Hot</p>
        <p id="new">New</p>
        <p id="top">Top</p>
      </div>
      {isLoading ? <p>Loading content...</p> : null}
      {isError ? <p>Error! Check your connection...</p> : null}
      <div className="posts color_four">
        {contents.map((thing) => {
          return (
            <div className="content-container color_three" key={thing.id}>
              <div className="post-upvote">
                <p className="color_one">{thing.score}</p>
              </div>
              <div className="post-content">
                <h2 id="title">{thing.title}</h2>
                {thing.isSelf ? (
                  <p id="selftext">{thing.selftext}</p>
                ) : (
                  <img alt="media" id="media" src={thing.thumbnail} />
                )}
                <div id="details">
                  <p id="subreddit">{thing.subreddit}</p>
                  <p id="authorDate">
                    {thing.author} {thing.createdDate}
                  </p>
                  <p
                    id="numComments"
                    className="addHover"
                    onClick={renderComments}
                  >
                    <img
                      src="http://cdn.onlinewebfonts.com/svg/img_420387.png"
                      alt="comments"
                    />
                    {thing.numComments}
                  </p>
                </div>
                <div className="comments">
                  {comments.map((comm) => {
                    return (
                      <div
                        className="comment color_two"
                        id={comm.id}
                        onClick={hideComment}
                      >
                        <div id="userTime">
                          <p id="commUser">{comm.userName}</p>
                          <p id="commTimestamp">2h</p>
                        </div>
                        <p id="commBody">{comm.body}</p>
                        <p id="commScore">score</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

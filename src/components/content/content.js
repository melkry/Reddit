import React, { useEffect } from "react";
import "./content.css";
import { useDispatch, useSelector } from "react-redux";
import { selectContents } from "../../features/content/contentSlice";
import { selectStatus } from "../../features/content/contentSlice";
import { redditAPI } from "../../features/content/contentSlice";
import { selectCurrentSubr } from "../../features/content/contentSlice";
import { getComments } from "../../features/comments/commentsSlice";
import { selectComments } from "../../features/comments/commentsSlice";
import { selectCommentStatus } from "../../features/comments/commentsSlice";
import { clearComments } from "../../features/comments/commentsSlice";
import { intToString } from "../../helpers";

export const Content = () => {
  const dispatch = useDispatch();
  const contents = useSelector(selectContents);
  const currentSubr = useSelector(selectCurrentSubr);
  const comments = useSelector(selectComments);
  const { isLoading, isError } = useSelector(selectStatus);
  const { isCommentsLoading, isCommentsError } = useSelector(
    selectCommentStatus
  );

  const hideComment = (e) => {
    const commEl = e.target.parentElement;
    if (commEl.classList.contains("hidden")) {
      commEl.classList.remove("hidden");
    } else {
      commEl.classList.add("hidden");
    }
  };

  const displayMedia = (thing) => {
    if (thing.isSelf) {
      return <p id="selftext">{thing.selftext}</p>;
    } else if (
      thing.url.includes(".png") ||
      thing.url.includes(".jpg") ||
      thing.url.includes(".gif")
    ) {
      return (
        <>
          {thing.selftext && <p id="selftext">{thing.selftext}</p>}
          <img alt="reddit-img" id="media" src={thing.url} />
        </>
      );
    } else if (thing.url.includes("v.redd")) {
      return (
        <>
          <img
            alt="play"
            id="play-button"
            onClick={() => window.open(thing.url, "_blank")}
            src="https://www.freeiconspng.com/thumbs/button-icon-png/play-button-icon-png-17.png"
          />
          <img
            alt="reddit-vid"
            id="media"
            className="video"
            onClick={() => window.open(thing.url, "_blank")}
            src={thing.thumbnail}
          />
        </>
      );
    } else {
      return <a href={thing.url}>Link</a>;
    }
  };

  useEffect(() => {
    dispatch(redditAPI());
  }, [dispatch]);

  const handleClick = (e) => {
    const hotEl = document.getElementById("hot");
    const newEl = document.getElementById("new");
    const topEl = document.getElementById("top");
    const type = e.target.id;
    const elList = [hotEl, newEl, topEl];
    for (let elInd in elList) {
      let el = elList[elInd];
      if (el.classList.contains("activeTab")) {
        el.classList.remove("activeTab");
        el.classList.add("inactiveTab");
      }
    }
    e.target.classList.remove("inactiveTab");
    e.target.classList.add("activeTab");

    dispatch(redditAPI({ subreddit: currentSubr, listing: type }));
  };

  return (
    <div className="content color_four">
      <div className="subrTitle">
        <h2>r/{currentSubr}</h2>
      </div>
      <div className="title color_five">
        <p id="hot" className="inactiveTab" onClick={handleClick}>
          Hot
        </p>
        <p id="new" className="inactiveTab" onClick={handleClick}>
          New
        </p>
        <p id="top" className="inactiveTab" onClick={handleClick}>
          Top
        </p>
      </div>
      {isLoading ? <p>Loading content...</p> : null}
      {isError ? <p>Error! Check your connection...</p> : null}
      <div className="posts color_four">
        {contents.map((thing) => {
          return (
            <div className="content-container color_three" key={thing.id}>
              <div className="post-upvote">
                <p className="color_one">{intToString(thing.score)}</p>
              </div>
              <div className="post-content">
                <h2 id="title">{thing.title}</h2>
                {displayMedia(thing)}
                <div id="details">
                  <p id="subreddit">{thing.subreddit}</p>
                  <p id="authorDate">{thing.author}</p>
                  <p
                    id="numComments"
                    className="addHover"
                    onClick={() =>
                      !comments[0]
                        ? dispatch(getComments(thing.permalink))
                        : dispatch(clearComments())
                    }
                  >
                    <img
                      src="http://cdn.onlinewebfonts.com/svg/img_420387.png"
                      alt="comments"
                    />
                    {intToString(thing.numComments)}
                  </p>
                </div>
                <div className="comments">
                  {isCommentsLoading ? <p>loading comments...</p> : null}
                  {isCommentsError ? <p>Error loading comments...</p> : null}
                  {comments
                    .filter((el) => el.postId === thing.id)
                    .map((comm) => {
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
                          <p id="commScore">{comm.score}</p>
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

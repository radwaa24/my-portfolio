import React, { useState } from "react";
import styles from "../../components/styles/settingsstyles.module.css";

export default function Notifications() {
  const [mentions, setMentions] = useState(false);
  const [commentsOnPosts, setCommentsOnPosts] = useState(false);
  const [upvotesOnPosts, setUpvotesOnPosts] = useState(false);
  const [upvotesOnComments, setUpvotesOnComments] = useState(false);
  const [repliesToComments, setRepliesToComments] = useState(false);
  const [activityOnComments, setActivityOnComments] = useState(false);
  const [activityOnChatPosts, setActivityOnChatPosts] = useState(false);

  const handleMentionsClick = () => {
    setMentions(!mentions);
  };

  const handleCommentsOnPostsClick = () => {
    setCommentsOnPosts(!commentsOnPosts);
  };

  const handleUpvotesOnPostsClick = () => {
    setUpvotesOnPosts(!upvotesOnPosts);
  };

  const handleUpvotesOnCommentsClick = () => {
    setUpvotesOnComments(!upvotesOnComments);
  };

  const handleRepliesToCommentsClick = () => {
    setRepliesToComments(!repliesToComments);
  };

  const handleActivityOnCommentsClick = () => {
    setActivityOnComments(!activityOnComments);
  };

  const handleActivityOnChatPostsClick = () => {
    setActivityOnChatPosts(!activityOnChatPosts);
  };

  const renderCheckbox = (isChecked) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="24"
      viewBox="0 0 44 24"
      fill="none"
      style={{ cursor: "pointer" }}
    >
      <rect
        width="43.166"
        height="23.9811"
        rx="11.9906"
        fill={isChecked ? "#32CD00" : "#D9D9D9"}
      />
      <rect
        x={isChecked ? "22.07666" : "4.07666"}
        y="3.59766"
        width="16.7868"
        height="16.7868"
        rx="8.39339"
        fill={isChecked ? "#ffff" : "#ffff"}
      />
    </svg>
  );

  return (
    <div className="px-6">
      <div id={"block"}>
        <h1 className={`${styles.bottomheader} py-4 ml-5 `}>
          Notification Settings
        </h1>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Mentions of u/username
          </span>
          <span onClick={handleMentionsClick}>{renderCheckbox(mentions)}</span>
        </div>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Comments on your posts
          </span>
          <span onClick={handleCommentsOnPostsClick}>
            {renderCheckbox(commentsOnPosts)}
          </span>
        </div>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Upvotes on your posts
          </span>
          <span onClick={handleUpvotesOnPostsClick}>
            {renderCheckbox(upvotesOnPosts)}
          </span>
        </div>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Upvotes on your comments
          </span>
          <span onClick={handleUpvotesOnCommentsClick}>
            {renderCheckbox(upvotesOnComments)}
          </span>
        </div>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Replies to your comments
          </span>
          <span onClick={handleRepliesToCommentsClick}>
            {renderCheckbox(repliesToComments)}
          </span>
        </div>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Activity on your comments
          </span>
          <span onClick={handleActivityOnCommentsClick}>
            {renderCheckbox(activityOnComments)}
          </span>
        </div>

        <div className="flex lg:mx-16 m-6 pb-4 justify-between">
          <span className={styles.notificationlabel}>
            Activity on chat posts you're in
          </span>
          <span onClick={handleActivityOnChatPostsClick}>
            {renderCheckbox(activityOnChatPosts)}
          </span>
        </div>
      </div>
    </div>
  );
}

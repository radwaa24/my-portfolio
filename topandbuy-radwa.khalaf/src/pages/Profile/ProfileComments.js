import React, { useState } from "react";
import { IconBtn } from "../../components/common";
import { PostInfoContainer } from "../../components/posts/PostInfoContainer";

const ProfileComments = () => {
  return (
    <div className="p-15 border-t w-full">
      <PostInfoContainer style={{ marginBottom: "100px" }} />
      <div className="flex items-center justify-between w-445 mt-0 ml-8">
        <LikeCounter />
        <CommentCounter />
        <ShareButton />
        <SaveButton />
      </div>
    </div>
  );
};

export default ProfileComments;

const LikeCounter = () => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    console.log("like button is clicked");
    setClicked(true);
  };

  return (
    <div className="flex items-center relative">
      <IconBtn handleClick={handleButtonClick}>
        {React.cloneElement(likebtn, {
          style: { stroke: clicked ? "red !important" : "#353535" },
        })}
      </IconBtn>
    </div>
  );
};

const CommentCounter = () => {
  const [commentCount, setCommentCount] = useState(0);

  const handleButtonClick = () => {
    console.log("comment button is clicked");
    setCommentCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex items-center relative">
      <IconBtn handleClick={handleButtonClick}>{commbtn}</IconBtn>
      <span className="absolute right-0 bottom-0">{commentCount}</span>
    </div>
  );
};

const ShareButton = () => {
  const handleButtonClick = () => {
    console.log("Share button is clicked");
    // TODO: Add logic to share product
  };

  return <IconBtn handleClick={handleButtonClick}>{sharebtn}</IconBtn>;
};

const SaveButton = () => {
  const handleButtonClick = () => {
    console.log("Save button is clicked");
    // TODO: Add logic to share product
  };

  return <IconBtn handleClick={handleButtonClick}>{savebtn}</IconBtn>;
};

const likebtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="22"
    viewBox="0 0 25 22"
    fill="none"
  >
    {/* ... (unchanged SVG path) */}
  </svg>
);

const commbtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    {/* ... (unchanged SVG path) */}
  </svg>
);

const sharebtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
  >
    {/* ... (unchanged SVG path) */}
  </svg>
);

const savebtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
  >
    {/* ... (unchanged SVG path) */}
  </svg>
);

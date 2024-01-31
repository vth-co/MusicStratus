import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LikeCounter = ({ song }) => {
  const likesObj = useSelector((state) => state.likes);
  const likes = Object.values(likesObj);
  const songLikes = likes.filter((like) => like.songId === song.id);
  const likeCount = songLikes.length;

  return (
    <>
        {likeCount > 0 && <p className="like-counter rendered">{likeCount}</p>}
        {likeCount === 0 && <p className="like-counter not-rendered">Like</p>}
    </>
  );
};

export default LikeCounter;

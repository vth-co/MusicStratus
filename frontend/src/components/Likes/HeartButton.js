import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike } from "../../store/likes";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Likes.css"
import LikeCounter from "./LikeCounter";

const HeartButton = ({song}) => {
  const user = useSelector((state) => state.session.user);
  const likesObj = useSelector((state) => state.likes);
  const likes = Object.values(likesObj);
  const dispatch = useDispatch();
  const history = useHistory();

  let songLikes;
  let userLike;
  if (likes) {
    songLikes = likes?.filter((like) => like.songId === song.id);
    userLike = songLikes?.find((songLike) => songLike.userId === user?.id);
  }
  useEffect(() => {

    if (userLike) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  }, [userLike])

  const [heart, setHeart] = useState(false);

  const handleLike = async () => {
    if (user) {
      if (!heart) {
        const payload = {
          userId: user.id,
          songId: song.id,
        };
        dispatch(addLike(payload));
        setHeart(true);
      } else {
        try {
          await dispatch(deleteLike(userLike.id));
          setHeart(false);
        } catch (error) {
          // Handle any errors, e.g., failed delete action
          console.error("Error unliking song:", error);
        }
      }
    } else {
      history.push('/');
    }
  };

  let heartIcon;
  if (heart) {
    heartIcon = <i className="fa-solid fa-heart"></i>;
  } else {
    heartIcon = <i className="fa-regular fa-heart"></i>;
  }

  return (
    <>
      <button className="heartbtn" onClick={handleLike}>
      {heartIcon}
      </button>
    </>
  );
};

export default HeartButton;

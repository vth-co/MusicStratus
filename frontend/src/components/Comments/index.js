import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments } from "../../store/comments";
import EditCommentModal from "./EditCommentModal";
import "./Comments.css";

function Comments({ songId }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const username = sessionUser.username;

  const commentsObj = useSelector((state) => state.comments.comments);
  const comments = Object.values(commentsObj);

  let songComments = [];
  comments.forEach((comment) => {
    if (comment.songId === songId) {
      songComments.push(comment);
    }
  });

  return (
    <>
      {songComments?.reverse().map((comment) => (
        <div key={comment?.id}>
          <div className="songComments" >
            {/* <div className="comment-user">{username}</div> */}
            <li className="comment">
              <img
                className="user-icon"
                src="../../../images/default-icon.png"
              ></img>
              {comment?.body}
            </li>
            {comment.userId === userId && (
              <EditCommentModal comment={comment} />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EditCommentModal from "./EditCommentModal";
import "./Comments.css";
import { useState } from "react";
import DeleteCommentModal from "./DeleteComment";

import { formatDistanceToNowStrict } from "date-fns";

function Comments({ songId }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const defaultImage = "https://musicstratus.s3.us-west-1.amazonaws.com/360_F_603307418_jya3zntHWjXWn3WHn7FOpjFevXwnVP52.jpg";

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const commentsObj = useSelector((state) => state.comments.comments);
  const usersObj = useSelector((state) => state.users.users);


  const comments = Object.values(commentsObj);
  const users = Object.values(usersObj);

  const timeAgo = (dateString) => {
    const createdAt = new Date(dateString);
    return formatDistanceToNowStrict(createdAt, { addSuffix: true });
  };

  const [isEditing, setIsEditing] = useState(false);

  let songComments = [];
  comments.forEach((comment) => {
    if (comment.songId === songId) {
      songComments.push(comment);
    }
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      {songComments?.reverse().map((comment) => (
        <div key={comment?.id} className="songComments">
          {/* Display the username of the comment author */}
          <img
            className="profile-icon-comment"
            src={users.find((user) => user.id === comment.userId)?.image ?? defaultImage}
            alt="profile"
          />
          <div className="comment-user-container">
            <p className="comment-user">
              {users.find((user) => user.id === comment.userId)?.username}
            </p>
            <p className="comment-content"> {comment?.body}</p>
          <div className="edit-delete-container">
            {comment.userId === userId && (
              <>
                <EditCommentModal comment={comment} />
                <DeleteCommentModal comment={comment} />
              </>
            )}
          </div>
          </div>
          <div>
            <p className="comment-time">{timeAgo(comment.createdAt)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;

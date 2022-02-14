import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments, deleteComment } from "../../store/comments";
import EditCommentModal from "../EditCommentModal";
import AddCommentModal from "../AddCommentModal";

function Comments({songId}) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const username = sessionUser.username;


  const commentsObj = useSelector((state) => state.comments.comments);
  const comments = Object.values(commentsObj);


  let songComments = [];
  comments.forEach(comments => {
    if (comments.songId === songId) {
      songComments.push(comments);
    }
  })


  const [body, setBody] = useState("");


  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let payload = {
      commentId: id
    };

    await dispatch(deleteComment(payload));
  }

  return (
    <>
      {songComments?.map((comment) => (
        <div>
        <div className="songComments">
          <div className="comment-user">{username}</div>
          <li key={comment?.id} className="comment">
            {comment?.body}
            <EditCommentModal  ele={comment?.id} />
            <button className="delete-comment-button" onClick={() => handleDelete(comment.id)}>Delete Comment</button>
          </li>
        
        </div>

        </div>
      ))}
    </>
  );
}

export default Comments;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editComment } from "../../store/comments";

function EditComment() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const commentObj = useSelector((state) => state.comments.comments);
  const comment = Object.values(commentObj);
  console.log("is this undefined?????", comment);


  const [body, setBody] = useState(comment?.body);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
    //   songId: songId,
      userId: userId,
        // ele,
      body,
    };
     dispatch(editComment(payload));
  };


  return (
    <div className="edit-song-form-div">
      <form className="edit-song-form" onSubmit={handleSubmit}>
          <h3>Edit Comment</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Comment:
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditComment;

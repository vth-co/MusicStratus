import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPlaylist } from "../../../store/playlists";

const EditPlaylist = ({ onClose, playlist }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(playlist?.name);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        id: playlist.id,
        name,
      };
      const updatedPlaylist = await dispatch(editPlaylist(payload));

      if (updatedPlaylist) {
        // Handle success, reset errors, and close modal
        setErrors([]);
        onClose();
      } else {
        // Handle failure and update errors
        setErrors(["Failed to update playlist. Please try again."]);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors(["An unexpected error occurred. Please try again."]);
    }
  };

  const handleCancel = () => {
    // Call the onClose prop to close the modal
    onClose();
  };

  return (
    <div className="edit-song-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Edit Song</h3>
        <div className="errors-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="form-inputs-container">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
            <button className="user-form-submit" type="submit">
              Update
            </button>
          <button className="exit" onClick={handleCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="svg-container"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlaylist;

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePlaylist } from "../../../store/playlists";
import "../Playlists.css"

const DeletePlaylist = ({ onClose, playlist }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the deleteSong action and wait for its completion
      const deletedPlaylist = await dispatch(deletePlaylist(playlist?.id));

      // Check if the song was deleted successfully
      if (deletedPlaylist) {
        // Handle success (e.g., show a success message)
        console.log("Playlist deleted successfully");
        history.push("/user");
      } else {
        // Handle deletion failure (e.g., show an error message)
        console.error("Failed to delete the song");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    } finally {
      // Close the modal (whether the operation succeeded or failed)
      onClose();
    }
  };

  const handleCancel = () => {
    // Call the onClose prop to close the modal
    onClose();
  };

  return (
    <>
      <div className="dlt-confirmation playlist">
        <h1>Delete playlist</h1>
        <p>
          Are you sure you want to delete {playlist.name}? This action cannot be
          undone.
        </p>
        <div className="dlt-btn-container">
          <button className="cncl-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="dlt-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePlaylist;

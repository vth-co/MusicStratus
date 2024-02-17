import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong } from "../../../store/songs";

const DeleteSong = ({ onClose, song }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  // const song = useSelector((state) => state.songs.songs[id]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the deleteSong action and wait for its completion
      const deletedSong = await dispatch(deleteSong(song?.id));

      // Check if the song was deleted successfully
      if (deletedSong) {
        // Handle success (e.g., show a success message)
        console.log("Song deleted successfully");
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
     <div className="dlt-confirmation">
      <h1>Are you sure?</h1>
        <p>Are you sure you want to delete {song.title}? This action cannot be undone.</p>
        <div className="dlt-btn-container">
          <button className="cncl-btn" onClick={handleCancel}>Cancel</button>
          <button className="dlt-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default DeleteSong;

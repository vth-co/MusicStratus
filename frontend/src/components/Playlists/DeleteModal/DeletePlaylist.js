import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deletePlaylist } from "../../../store/playlists";

const DeletePlaylist = ({ onClose }) => {
    
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
  
    const playlist = useSelector((state) => state.playlist[id]);
    const [errors, setErrors] = useState([]);
  
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
         <div className="dlt-confirmation">
          <h1>Are you sure?</h1>
            <p>Are you sure you want to delete {playlist.title}? This action cannot be undone.</p>
            <div className="dlt-btn-container">
              <button className="cncl-btn" onClick={handleCancel}>Cancel</button>
              <button className="dlt-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </>
      );
}

export default DeletePlaylist;

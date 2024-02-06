import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileImage } from "../../../store/session";
import "../UserImage.css"

const UploadUserImage = ({ onClose }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadMode, setUploadMode] = useState(false);


  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (image) {
      await dispatch(updateUserProfileImage(user.id, image));
      setUploadMode(false);
    }
  };

  const handleCancel = () => {
    setUploadMode(false);
    setImage(null);
  };

  return (
    <>
      <div>
        <h1 className="form-title">Image Preview</h1>
        <input type="file" onChange={updateFile} />
        {imagePreview && (
          <div className="image-preview-container">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="image-preview"
            />
          </div>
        )}
        <button onClick={handleSave}>Save</button>
        <button className="exit" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="svg-container"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </>
  );
};

export default UploadUserImage;

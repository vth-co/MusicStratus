import { useState } from "react";
import { useDispatch } from "react-redux";


const UploadUserImage = () => {
    const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
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
        </>
    )
}

export default UploadUserImage;

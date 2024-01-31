import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";

const AddPlaylist = ({ onClose, song }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([]);
    const [activeTab, setActiveTab] = useState("existing"); // "existing" or "new"

    const playlistsObj = useSelector((state) => state.playlists);
    const playlists = Object.values(playlistsObj);
    console.log(playlistsObj);

    const userPlaylists = playlists.filter((playlist) => playlist.userId === user.id)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderTabs = () => {
        return (
            <div className="playlist-tabs">
                <div onClick={() => handleTabChange("existing")} className={activeTab === "existing" ? "active" : ""}>
                    Add to Existing Playlists
                </div>
                <div onClick={() => handleTabChange("new")} className={activeTab === "new" ? "active" : ""}>
                    Create New Playlist
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        if (activeTab === "existing") {
            // Render content for adding to existing playlists
            return (
                // Your existing playlists logic here
                <div>
                    <h1>Existing Playlists</h1>
                    {userPlaylists.map((playlist) => (
                        <div>
                        </div>
                    ))}
                    {/* Render a list of existing playlists */}
                </div>
            );
        } else if (activeTab === "new") {
            // Render content for creating a new playlist
            return (
                // Your new playlist creation logic here
                <div>
                    <h1>Create a New Playlist</h1>
                    {/* Form for creating a new playlist */}
                </div>
            );
        }
    };

    return (
        <>
            <div className="playlist-menu">
                {renderTabs()}
                {renderTabContent()}
            </div>
        </>
    );
};

export default AddPlaylist;

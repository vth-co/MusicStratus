import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Playlist.css"

const PlaylistPage = () => {
  const { id } = useParams();
  const playlist = useSelector((state) => state.playlists[id]);

  // State to store the fetched songs
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch songs for the playlist
    const fetchSongs = async () => {
      try {
        const response = await fetch(`/api/playlists/${id}/songs`);
        if (response.ok) {
          const songsData = await response.json();
          setSongs(songsData);
        } else {
          console.error("Failed to fetch songs for the playlist.");
        }
      } catch (error) {
        console.error("An error occurred while fetching songs:", error);
      }
    };

    // Call the function to fetch songs when the component mounts
    fetchSongs();
  }, [id]);


  return (
    <>
      <div className="song-container">
        <h1 className="playlist-name">{playlist.name}</h1>
        {/* <p>{user.username}</p> */}
        {/* <h2>Songs in this Playlist:</h2> */}
        <ul>
          {songs.map((song) => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlaylistPage;

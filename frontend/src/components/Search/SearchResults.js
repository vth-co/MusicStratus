import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "./SearchResults.css"

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")
    ? decodeURIComponent(queryParams.get("q"))
    : "";

  // Get the songs object from the Redux store
  const songsObj = useSelector((state) => state.songs.songs);

  // Convert the songs object to an array
  const songs = Object.values(songsObj);

  // Filter the songs based on the search query
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentTrack, setTrackIndex] = useState("");

  return (
    <>
      <div className="page-container">
        {filteredSongs.length === 0 ? (
            <h3 className="zero-results">
              <i class="fa-solid fa-magnifying-glass"></i>
              Sorry we didn't find any results for "{searchQuery}". Check the
              spelling, or try a different search.
            </h3>
        ) : (
          <>
            <h2 className="page-title">Search Results</h2>
            <div className="grid-container">
              {filteredSongs.map((song) => (
                <div key={song.id}>
                  <NavLink className="song-link" to={`/songs/${song.id}`}>
                    <div className="card-container">
                      <img className="image" src={song.imageUrl} alt={""} />
                      <NavLink
                        to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      >
                        <button
                          className="card-play-button"
                          value={song?.url}
                          onClick={(e) => setTrackIndex(e.target.value)}
                        >
                          <i class="fa-solid fa-circle-play"></i>
                        </button>
                      </NavLink>
                    </div>
                    <p className="song-title">{song.title}</p>
                    <p className="song-artist">{song.artist}</p>
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="music-container">
              <AudioPlayer
                className="audio-player"
                volume={0.3}
                layout="horizontal-reverse"
                src={currentTrack}
                // customAdditionalControls={[
                //   <div>
                //     <button>
                //       {/* button 2<p className="song-title">{song?.title}</p> */}
                //     </button>
                //     <button>button 3 </button>
                //     <button>button 4 </button>
                //   </div>,
                // ]}
                customProgressBarSection={[
                  RHAP_UI.CURRENT_TIME,
                  <div>/</div>,
                  RHAP_UI.DURATION,
                  RHAP_UI.PROGRESS_BAR,
                  RHAP_UI.VOLUME,
                ]}
                customVolumeControls={[]}
                // style={{
                //   width: "600px",
                // }}
                // customAdditionalControls={[
                //   // <button>
                //   //   {/* <img className="image" src={song?.imageUrl} alt={""}></img> */}
                //   // </button>,
                // ]}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchResults;

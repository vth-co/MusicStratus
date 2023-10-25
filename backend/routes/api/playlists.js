const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const playlists = await db.Playlist.findAll();
    res.json(playlists);
  })
);

router.post(
  "/",
  asyncHandler(async function (req, res) {
    const playlist = await db.Playlist.create(req.body);
    return res.json(playlist);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const playlistId = await db.Playlist.findAll();
    return res.json(playlistId);
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const playlistId = await db.Playlist.findByPk(req.params.id);

    playlistId.destroy();
    return res.json({ message: `${playlistId.title} has been deleted!` });
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const playlistId = req.params.id;

    const playlist = await db.Playlist.findOne({ where: { id: playlistId } });
    playlist.update(req.body);
    return res.json(playlist);
  })
);

// Get songs for a specific playlist
router.get(
  "/:id/songs",
  asyncHandler(async (req, res) => {
    const playlistId = req.params.id;

    // Fetch the playlist
    const playlist = await db.Playlist.findByPk(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Fetch the songs associated with the playlist
    const songs = await playlist.getSongs();

    return res.json(songs);
  })
);

// Add a song to a playlist
router.post(
  "/:id/songs",
  asyncHandler(async (req, res) => {
    const playlistId = req.params.id;

    // Fetch the playlist
    const playlist = await db.Playlist.findByPk(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Create a new song and associate it with the playlist
    const song = await db.Song.create(req.body);
    await playlist.addSong(song);

    return res.json(song);
  })
);

// Edit a song in a playlist
router.put(
  "/:playlistId/songs/:songId",
  asyncHandler(async (req, res) => {
    const playlistId = req.params.playlistId;
    const songId = req.params.songId;

    // Fetch the playlist
    const playlist = await db.Playlist.findByPk(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Fetch the song within the playlist
    const song = await playlist.getSongs({ where: { id: songId } });

    if (!song || song.length === 0) {
      return res
        .status(404)
        .json({ message: "Song not found in the playlist" });
    }

    // Update the song's details
    await song[0].update(req.body);

    return res.json(song[0]);
  })
);

// Delete a song from a playlist
router.delete(
  "/:playlistId/songs/:songId",
  asyncHandler(async (req, res) => {
    const playlistId = req.params.playlistId;
    const songId = req.params.songId;

    // Fetch the playlist
    const playlist = await db.Playlist.findByPk(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Fetch the song within the playlist
    const song = await playlist.getSongs({ where: { id: songId } });

    if (!song || song.length === 0) {
      return res
        .status(404)
        .json({ message: "Song not found in the playlist" });
    }

    // Remove the song from the playlist
    await playlist.removeSong(song[0]);

    return res.json({
      message: `Song ${song[0].title} has been removed from the playlist`,
    });
  })
);

module.exports = router;

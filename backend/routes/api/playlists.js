const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

router.get(
    '/', 
    asyncHandler(async function(req, res) {
    const playlists = await db.Playlist.findAll();
    res.json({ playlists });
}))


router.post(
    '/',
    asyncHandler(async function (req, res) {
        const playlist = await db.Playlist.create(req.body);
        return res.json(playlist);
    })
);

router.get(
    '/:id',
    asyncHandler(async function(req, res) {
        const playlistId = await db.Playlist.findAll();
        return res.json(playlistId);
    })
);

router.delete(
    "/:id",
    asyncHandler(async function(req, res) {
        const playlistId = await db.Playlist.findByPk(req.params.id);

        playlistId.destroy()
        return res.json({ message: `${playlistId.title} has been deleted!`});
    })
);

router.put(
    "/:id",
    asyncHandler(async function(req, res) {
        const playlistId = req.params.id;

        const playlist = await db.Playlist.findOne({ where: {id: playlistId}});
        playlist.update(req.body)
        return res.json(playlist);
    })
)


module.exports = router;

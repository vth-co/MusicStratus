const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

router.get(
    '/', 
    asyncHandler(async function(req, res) {
    const songs = await db.Song.findAll();
    res.json({ songs });
}))


router.post(
    '/',
    asyncHandler(async function (req, res) {
        const song = await db.Song.create(req.body);
        return res.json(song);
    })
);

router.get(
    '/:id',
    asyncHandler(async function(req, res) {
        const songId = await db.Song.findAll();
        return res.json(songId);
    })
);

router.delete(
    "/:id",
    asyncHandler(async function(req, res) {
        const songId = await db.Song.findByPk(req.params.id);

        songId.destroy()
        return res.json({ message: `${songId.title} has been deleted!`});
    })
);

router.put(
    "/:id",
    asyncHandler(async function(req, res) {
        const songId = req.params.id;

        const song = await db.Song.findOne({ where: {id: songId}});
        song.update(req.body)
        return res.json(song);
    })
)


module.exports = router;

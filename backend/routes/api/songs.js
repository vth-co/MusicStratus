const express = require('express');
const router = express.Router();

const { Song } = require('../../db/models');

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const asyncHandler = (handler) => (req, res, next) => {
    handler(req, res, next). catch(next);
}

router.get(
    '/', 
    asyncHandler(async function(req, res) {
    const songs = await Song.findAll();
    res.json({ songs });
}))


router.post(
    '/',
    asyncHandler(async function (req, res) {
        const song = await Song.create(req.body);
        return res.json(song);
    })
);

router.get(
    '/:id',
    asyncHandler(async function(req, res) {
        const songId = await Song.findAll();
        return res.json(songId);
    })
);

router.delete(
    "/:id",
    asyncHandler(async function(req, res) {
        const songId = await Song.findByPk(req.params.id);

        songId.destroy()
        return res.json({ message: `${songId.title} has been deleted!`});
    })
);

router.put(
    "/:id",
    asyncHandler(async function(req, res) {
        const songId = req.params.id;

        const song = await Song.findOne({ where: {id: songId}});
        song.update(req.body)
        return res.json(song);
    })
)


module.exports = router;

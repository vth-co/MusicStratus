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
    asyncHandler(async (req, res) => {
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

router.delete(
    "/:id",
    asyncHandler(async function(req, res) {
        const songId = await Song.findByPk(req.params.id);

        songId.destroy()
        return res.json({ message: `${songId.title} has been deleted!`});
    })
);


module.exports = router;

const express = require('express');
const router = express.Router();

const db = require('../../db/models');
const { Song } = db;

const asyncHandler = (handler) => (req, res, next) => {
    handler(req, res, next). catch(next);
}

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json({ songs });
}))

module.exports = router;

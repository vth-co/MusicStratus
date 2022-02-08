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

module.exports = router;

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

router.get(
    '/', 
    asyncHandler(async function(req, res) {
    const likes = await db.Like.findAll();
    res.json(likes);
}))


router.post(
    '/',
    asyncHandler(async function (req, res) {
        const like = await db.Like.create(req.body);
        return res.json(like);
    })
);

router.delete(
    "/:id",
    asyncHandler(async function(req, res) {
        const likeId = await db.Like.findByPk(req.params.id);

        likeId.destroy()
        return res.json({ message: `${likeId.title} has been deleted!`});
    })
);


module.exports = router;

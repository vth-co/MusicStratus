const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');



router.get(
    '/',
    asyncHandler(async function(req, res) {
        const comments = await db.Comment.findAll();
        res.json(comments);
    })
);

router.post(
    '/',
    asyncHandler(async function(req, res) {
        const comment = await db.Comment.create(req.body);
        return res.json(comment);
    })
);

router.put(
    '/:commentId',
    asyncHandler(async function(req, res) {
        const commentId = req.params.commentId;

        const comment = await db.Comment.findOne({ where: {id: commentId}});
        comment.update(req.body)
        return res.json(comment);
    })
);

router.delete(
    '/:commentId',
    asyncHandler(async function(req, res) {
        const commentId = await db.Comment.findByPk(req.params.commentId);

        commentId.destroy()
        return res.json({ message: `${commentId.body} has been deleted!`})
    })
);

module.exports = router;

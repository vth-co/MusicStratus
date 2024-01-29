const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const db = require("../../db/models");


const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const image = await singlePublicFileUpload(req.file);
    const user = await User.signup({ email, username, password, image, });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.put(
  "/:id",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const image = await singlePublicFileUpload(req.file);
    await User.update({ image }, { where: { id } });

    res.json({ image });
  })
);

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const users = await db.User.findAll();
    res.json(users);
  })
);

// Search users
router.get(
  "/search",
  asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const users = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${query}%`, // Case-insensitive search
        },
      },
    });

    return res.json({ users });
  })
);

module.exports = router;

"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      headerImage: {
        type: DataTypes.STRING,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Song, {
      as: 'songs',
      foreignKey: 'userId'
    })
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'userId'
    })
    User.hasMany(models.Like, {
      as: 'likes',
      foreignKey: 'userId'
    });
    User.hasMany(models.Playlist, {
      as: 'playlists',
      foreignKey: 'userId'
    });
  };

  User.prototype.toSafeObject = function () {
    const { id, username, email, image, headerImage } = this; // context will be the User instance
    return { id, username, email, image, headerImage };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

 User.signup = async function ({ username, email, password }) {
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    username,
    email,
    hashedPassword,
  });
  return await User.scope('currentUser').findByPk(user.id);
};

User.updateImage = async function (userId, image) {
  return await User.update({ image }, { where: { id: userId } });
};


  return User;
};

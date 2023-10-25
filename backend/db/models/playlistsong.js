"use strict";
module.exports = (sequelize, DataTypes) => {
  const PlaylistSong = sequelize.define(
    "PlaylistSong",
    {
      playlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Playlist',
          key: 'id'
        }
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Song',
          key: 'id'
        }
      },
    },
    {}
  );
  PlaylistSong.associate = function (models) {
    // associations can be defined here
  };
  return PlaylistSong;
};

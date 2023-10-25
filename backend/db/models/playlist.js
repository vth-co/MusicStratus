'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    // likeId: DataTypes.INTEGER,
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
    // Playlist.belongsTo(models.Like, {
    //   as: 'like',
    //   foreignKey: 'likeId'
    // });
    Playlist.belongsToMany(models.Song, { 
      through: 'PlaylistSong',
      as: 'songs',
      foreignKey: 'playlistId'
    });
  };
  return Playlist;
};

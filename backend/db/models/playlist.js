'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsTo(models.User);
    Playlist.belongsToMany(models.Song, { through: 'PlaylistSong' });
  };
  return Playlist;
};

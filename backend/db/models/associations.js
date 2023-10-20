module.exports = (models) => {
    // Define associations here
    models.Playlist.belongsToMany(models.Song, { through: 'PlaylistSong' });
    models.Song.belongsToMany(models.Playlist, { through: 'PlaylistSong' });
  };

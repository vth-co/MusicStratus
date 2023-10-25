'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    // playlistId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Like.belongsTo(models.Song, {
      foreignKey: 'songId'
    })
    // Like.belongsTo(models.Playlist, {
    //   foreignKey: 'playlistId'
    // });
  };
  return Like;
};

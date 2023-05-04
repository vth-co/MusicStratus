'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  };
  return Song;
};

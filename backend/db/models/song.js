'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const generateRandomSongIds = (count, maxSongId) => {
      const songIds = [];
      while (songIds.length < count) {
        const randomSongId = Math.floor(Math.random() * maxSongId) + 1;
        if (!songIds.includes(randomSongId)) {
          songIds.push(randomSongId);
        }
      }
      return songIds;
    };

    const playlistSongRecords = [];
    
    for (let playlistId = 1; playlistId <= 15; playlistId++) {
      const songCount = Math.floor(Math.random() * 8) + 3; // Generate 3-10 songs
      const songIds = generateRandomSongIds(songCount, 90);

      songIds.forEach((songId) => {
        playlistSongRecords.push({
          playlistId,
          songId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }

    return queryInterface.bulkInsert('PlaylistSongs', playlistSongRecords, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};

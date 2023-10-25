'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('PlaylistSongs', [
        {
          playlistId: 1, // Replace with the actual playlist ID
          songId: 1, // Replace with the actual song ID
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 1, // Replace with the actual playlist ID
          songId: 2, // Replace with the actual song ID
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playlistId: 2, // Replace with the actual playlist ID
          songId: 3, // Replace with the actual song ID
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more PlaylistSong records as needed to associate songs with playlists
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      
    */
      return queryInterface.bulkDelete("PlaylistSongs", null, {});

  }
};

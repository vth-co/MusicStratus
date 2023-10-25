"use strict";

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
    // Create seeders for playlists based on songs
    return queryInterface.bulkInsert(
        "Playlists",
        [
          {
            userId: 1,
            name: "My Favorite Tunes",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Gym Workout Playlist",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
      
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete("Playlists", null, {});

  },
};

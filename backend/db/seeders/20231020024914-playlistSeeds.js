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
            name: "My Favorite Songs",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Gym Workout Playlist",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Car Radio Tunes",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "CTRL+ALT+LISTEN",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Lush Melodies",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Shower Sing-a-long",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Midnight Mixtape",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Eclectic Echoes",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Stellar Soundscape",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Twilight Tunes",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Serendipity Shuffle",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Harmonic Horizon",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Nebula Notes",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Radiant Rhythms",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            name: "Wanderlust Waves",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            name: "Playlist #1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            name: "Playlist #2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            name: "Playlist #3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 3,
            name: "Playlist #1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 3,
            name: "Playlist #2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 3,
            name: "Playlist #3",
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

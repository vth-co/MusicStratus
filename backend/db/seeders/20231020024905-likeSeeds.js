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

    return queryInterface.bulkInsert("Likes", [
      {
        userId: 1,
        songId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        songId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        songId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        songId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        songId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        songId: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Likes", null, {});
  },
};

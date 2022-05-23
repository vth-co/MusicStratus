'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {
      userId: 1,
      songId: 1,
      body: 'This is good!',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      songId: 2,
      body: 'I like it!',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 2,
      songId: 2,
      body: 'Awesome',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 2,
      songId: 1,
      body: 'Cool!!',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};

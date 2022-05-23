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
      userId: 54,
      songId: 97,
      body: 'This is good!',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 55,
      songId: 97,
      body: 'I like it!',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 54,
      songId: 98,
      body: 'Awesome',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 55,
      songId: 98,
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

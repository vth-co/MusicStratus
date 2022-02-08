'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Songs', [
     {
      userId: 1,
      title: 'Valorant OST - Loading',
      url: 'https://www.youtube.com/watch?v=mx7fQOnt82E&ab_channel=Devvy',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Hades - The Unseen Ones',
      url: 'https://www.youtube.com/watch?v=6NBl9NXBT3g&ab_channel=SupergiantGames',
      imageUrl: 'https://www.nintendo.com//content/dam/noa/en_US/games/switch/h/hades-switch/hades-switch-hero.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 2,
      title: 'MapleStory - Temple of Time',
      url: 'https://www.youtube.com/watch?v=6uCaEDM-Kf8&ab_channel=SlipySlidy',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 2,
      title: 'Lake Remastered',
      url: 'https://www.youtube.com/watch?v=oEvn0woNwmo&ab_channel=Zame',
      imageUrl: 'https://cdn1.dotesports.com/wp-content/uploads/2020/05/30180125/maxresdefault-1-2.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Songs', null, {});
  }
};

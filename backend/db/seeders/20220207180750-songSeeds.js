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
      title: 'Netherplace',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Netherplace.mp3',
      imageUrl: 'https://www.niemanlab.org/images/void.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Our-Mountain',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Our-Mountain_v003.mp3',
      imageUrl: 'https://i.redd.it/1r1kk9qi00961.png',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 2,
      title: 'Platformer2',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Platformer2.mp3',
      imageUrl: 'https://www.digipen.edu/sites/default/files/public/img/games/03-image/digipen-student-game-arc-apellago-arc-apellago-img.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 2,
      title: 'Superboy',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Superboy.mp3',
      imageUrl: 'https://www.desktopbackground.org/download/o/2015/05/11/946288_i-really-wanted-superboy-injustice-gods-among-us-message-board_700x808_h.jpg',
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

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
      title: "You're Gonna Love Me",
      url: "https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Eliminate+-+You're+Gonna+Love+Me+Ft.+Leah+Culver.mp3",
      imageUrl: 'https://i1.sndcdn.com/artworks-000614266257-jmq3bm-t500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Slippy',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Slippy+-+Dawn+(feat.+London+Thor)+%5BMonstercat+Release%5D.mp3',
      imageUrl: 'https://images.genius.com/9ec26c91a891df30789e65d3a7ac39df.1000x1000x1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: "Let's Roll",
      url: "https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Ephixa+%26+Going+Quantum+-+Let's+Roll+%5BMonstercat+Release%5D.mp3",
      imageUrl: 'https://resources.tidal.com/images/12f9a593/ee4d/45e0/a116/3a45c6920392/640x640.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Wishes',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Grant+-+Wishes+(feat.+McCall)+%5BMonstercat+Official+Music+Video%5D.mp3',
      imageUrl: 'https://images.genius.com/d307de0a4d66145fc324e495e2d18a1c.1000x1000x1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'East Bridge',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Hex+Cougar%2C+Pauline+Herr%2C+So+Sus+%26+Sejo+-+East+Bridge.mp3',
      imageUrl: 'https://i1.sndcdn.com/artworks-0EzIIj3g3GlKgJrG-XFAwHw-t500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Shivering',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/ILLENIUM+-+Shivering+(feat.+Spiritbox)+%5BOfficial+Lyric+Video%5D.mp3',
      imageUrl: 'https://i1.sndcdn.com/artworks-WiFWdwtcgVWf-0-t500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Like Water',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Like+Water.mp3',
      imageUrl: 'https://i1.sndcdn.com/artworks-qz5txhA2itB9Mv5J-MIZJDA-t500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Unspoken',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Oliverse+-+Unspoken+(ft.+Elle+Exxe).mp3',
      imageUrl: 'https://i1.sndcdn.com/artworks-000544598661-n3dqut-t500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      userId: 1,
      title: 'Everyday',
      url: 'https://myawsbucketforsoundcloudclone.s3.us-west-1.amazonaws.com/Virtual+Riot+-+Everyday+Ft.+Yosie+__+Lyrics+%5BCC%5D.mp3',
      imageUrl: 'https://i1.sndcdn.com/artworks-000235438777-08vzxt-t500x500.jpg',
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
   return queryInterface.bulkDelete('Songs', null, {});
  }
};

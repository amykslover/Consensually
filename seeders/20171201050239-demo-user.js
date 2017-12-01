'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [{
        id: '44444444',
        userToken: '2313132139131',
        userName: 'Tennessee Walker',
        userEmail: 'demo4@demo.com',
        createdAt: '2017-11-28 12:15:27',
        updatedAt: '2017-11-28 12:15:27',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
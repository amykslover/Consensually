'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [{
        id: '11111111',
        userToken: '291029182192',
        userName: 'John Doe',
        userEmail: 'demo1@demo.com',
        createdAt: '2017-01-01 12:15:27',
        updatedAt: '2017-01-01 12:15:27',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
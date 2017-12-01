'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [{
        id: '11111111',
        userToken: '1234567890',
        userName: 'John Doe',
        userEmail: 'demo1@demo.com',
        createdAt: '2017-01-01 12:15:27',
        updatedAt: '2017-01-01 12:15:27',
      }], 
      [{
        id: '22222222',
        userToken: '987654321',
        userName: 'Jane Doe',
        userEmail: 'demo2@demo.com',
        createdAt: '2017-02-15 20:10:55',
        updatedAt: '2017-03-01 18:19:52',
      }],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
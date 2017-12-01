'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [{
        id: '22222222',
        userToken: '219371938701931',
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

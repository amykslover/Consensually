'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [{
        id: '55555555',
        userToken: '912803813011029',
        userName: 'Jillian Jacobs',
        userEmail: 'demo5@demo.com',
        createdAt: '2017-11-30 12:15:27',
        updatedAt: '2017-11-30 12:15:27',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

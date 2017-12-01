'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [{
        id: '33333333',
        userToken: '92812138198431',
        userName: 'Tammy Fallon',
        userEmail: 'demo3@demo.com',
        createdAt: '2017-11-01 12:15:27',
        updatedAt: '2017-11-01 12:15:27',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
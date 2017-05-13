'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Users',[{
      name: 'Stedy',
      username: 'stedy',
      password: 'stedy',
      email: 'stedyyulius@gmail.com',
      phone: '087878559222',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'James',
      username: 'james',
      password: 'james',
      email: 'james@gmail.com',
      phone: '0123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{})
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

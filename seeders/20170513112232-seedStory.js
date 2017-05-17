'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let arr=[{
      title: 'Title 3',
      premise: 'im abt to make a short movie for my school project',
      story: `im thinking about making something around a girl that has a psychological disorder`,
      question:'any idea of what should i make?',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Title 4',
      premise: 'im abt to make a short movie for my school project',
      story: `im thinking about making something around a girl that has a psychological disorder`,
      question:'any idea of what should i make?',
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Title 5',
      premise: 'im abt to make a short movie for my school project',
      story: `im thinking about making something around a girl that has a psychological disorder`,
      question:'any idea of what should i make?',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    return queryInterface.bulkInsert('Stories', arr, {});
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

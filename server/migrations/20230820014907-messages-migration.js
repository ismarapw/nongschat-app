'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id : {
        allowNull : false,
        type : Sequelize.INTEGER,
        references :{
          model : {
            tableName : 'users' 
          },
          key : 'id'
        },
        allowNull : false
      },
      receiver_id : {
        allowNull : false,
        type : Sequelize.INTEGER,
        references :{
          model : {
            tableName : 'users' 
          },
          key : 'id'
        },
        allowNull : false
      },
      content : {
        allowNull : false,
        type : Sequelize.TEXT
      },
      read_status : {
        allowNull : false,
        type : Sequelize.STRING,
        defaultValue : 'no'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('messages');
  }
};

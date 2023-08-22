const {DataTypes} = require('sequelize');
const db = require('../config/connection');

const Chat = db.define('messages', {
    sender_id : {
        allowNull : false,
        type : DataTypes.INTEGER,
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
        type : DataTypes.INTEGER,
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
        type : DataTypes.TEXT
    },
    read_status : {
      allowNull : false,
      type : DataTypes.STRING,
      defaultValue : 'no'
    },
});

module.exports = Chat;
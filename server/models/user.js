const {DataTypes} = require('sequelize');
const db = require('../config/connection');

const User = db.define('users', {
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    image : {
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue : "plain-avatar.jpg" 
    },
});

module.exports = User;
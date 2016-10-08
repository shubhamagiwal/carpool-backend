/**
* RedeemItem.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item:{
      type: Sequelize.STRING,
      require: true
    },
    desc:{
      type: Sequelize.STRING,
    },
    code:{
      type: Sequelize.STRING,
      unique:true
    },
    point:{
      type: Sequelize.INTEGER
    }
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  }
};

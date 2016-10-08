/**
* School.js
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
    name: {
        type: Sequelize.STRING,
        require: true
    },
    address: {
        type: Sequelize.STRING,
        require: true
    },
    latitude: {
            type: Sequelize.DECIMAL(10, 8),
            require: true
        },
    longitude: {
            type: Sequelize.DECIMAL(11, 8),
            require: true
        }
  }
};

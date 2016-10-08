/**
* UserCarpool.js
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
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    startTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    endTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    distance:{
      type: Sequelize.INTEGER,
    }
  },
  associations: function() {
      UserCarpool.belongsTo(User, {
          foreignKey: {
              name: 'userId',
              allowNull: false
          }
      });
  }
};

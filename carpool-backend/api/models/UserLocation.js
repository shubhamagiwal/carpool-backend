/**
* UserLocation.js
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
    latitude:{
      type: Sequelize.DECIMAL(10, 8),
      require: true
    },
    longitude:{
      type: Sequelize.DECIMAL(11, 8),
      require: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  },
  associations: function() {
      UserLocation.belongsTo(User, {
          foreignKey: {
              name: 'userId',
              allowNull: false
          }
      })

      UserLocation.belongsTo(School, {
          foreignKey: {
              name: 'schoolId',
              allowNull: false
          }
      });
  }
};

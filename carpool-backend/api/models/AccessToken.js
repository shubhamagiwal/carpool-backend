/**
* AccessToken.js
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
      token: {
          type: Sequelize.STRING,
          require: true,
          unique: true
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
      AccessToken.belongsTo(User, {
          foreignKey: {
              name: 'userId',
              allowNull: false
          }
      });
  }
};

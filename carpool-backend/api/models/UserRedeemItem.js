/**
* UserRedeemItem.js
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
    }
  },
  associations: function() {
      UserRedeemItem.belongsTo(User, {
          foreignKey: {
              name: 'userId',
              allowNull: false
          }
      });

      UserRedeemItem.belongsTo(RedeemItem, {
          foreignKey: {
              name: 'redeemId',
              allowNull: false
          }
      });
  }
};

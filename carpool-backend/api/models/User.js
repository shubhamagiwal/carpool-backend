/**
* User.js
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
          fullName: {
              type: Sequelize.STRING,
              require: true
          },
          picture: {
              type: Sequelize.STRING,
              validate: {
                  isUrl: true
              }
          },
          referralCode: {
              type: Sequelize.STRING
          },
          stateId:{
            type: Sequelize.STRING,
            unique:true,
            require:true
          },
          isStateIdVerified:{
            type:Sequelize.BOOLEAN,
            defaultValue:false
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
          User.belongsTo(AuthenticationProvider, {
              foreignKey: {
                  name: 'authenticationProviderId',
                  allowNull: false
              }
          });
      }
};

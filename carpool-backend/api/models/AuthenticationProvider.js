/**
* AuthenticationProvider.js
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
       email: {
           type: Sequelize.STRING,
           unique: true,
           validate: {
               isEmail: true
           }
       },
       phone: {
           type: Sequelize.BIGINT(10),
           require: true,
           unique: true,
           validate: {
               isNumeric: true
           }
       },
       isPhoneVerified: {
           type: Sequelize.BOOLEAN,
           defaultValue: false
       },
       facebookId: {
           type: Sequelize.STRING,
           unique: true
       },
       isEmailVerified: {
           type: Sequelize.BOOLEAN,
           defaultValue: false
       },
       isActivated: {
           type: Sequelize.BOOLEAN,
           defaultValue: false
       },
       isBlocked: {
           type: Sequelize.BOOLEAN,
           defaultValue: false
       },
       activatedAt: {
           type: Sequelize.DATE
       },
       blockedAt: {
           type: Sequelize.DATE
       },
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

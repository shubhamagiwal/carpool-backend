/**
 * RideDetail.js
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
        isComplete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },
    associations: function() {
        RideDetail.belongsTo(User, {
            foreignKey: {
                name: 'riderId',
                allowNull: false
            }
        });

        RideDetail.belongsTo(User, {
            foreignKey: {
                name: 'rideeId',
                allowNull: false
            }
        });
    }
};
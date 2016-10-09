/**
 * UserCarpoolController
 *
 * @description :: Server-side logic for managing Usercarpools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async=require("async");

module.exports = {
    put: function(req, res) {
        var riderId = req.body.riderId;
        var rideeId = req.body.rideeId;
        var point = req.body.point;
        var self = {};

        function createRideDetails(callback) {
            return sequelize.transaction(function(t) {
                return RideDetail.create({
                    riderId: riderId,
                    rideeId: rideeId,
                    isComplete: false
                }, { transaction: t }).then(function(riderDetails) {
                    self.riderDetails = riderDetails;
                    return UserPoint.create({
                        point: point,
                        userId: riderId
                    }, { transaction: t }).then(function(riderUpdateDetails) {
                        self.riderUpdateDetails = riderUpdateDetails;
                        UserPoint.create({
                            userId: rideeId,
                            point: -10
                        }).then(function(rideeUpdateDetails) {
                            self.rideeUpdateDetails = rideeUpdateDetails;
                        });
                    });
                });
            }).then(function(result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
                return callback(null);
            }).catch(function(err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                return callback("Could Not create the ride for the user");
            });
        }

        function responseCreation(callback) {
            var response = {};
            response.riderDetails = self.riderDetails;
            response.riderUpdateDetails = self.riderUpdateDetails;
            response.rideeUpdateDetails = self.rideeUpdateDetails;
            return res.ok(response);
        }

        async.waterfall([
            createRideDetails,
            responseCreation
        ], function(err) {
            if (err) {
                return res.badRequest({ exception: err });
            }
        });
    },

    giveReferralPoints: function(req, res) {
        var userId = req.body.userId;

        function giveReferralPointsForCarpoolingIntiative(callback) {
            UserPoint.create({
                userId: userId,
                point: 100
            }).then(function(response) {
                if (response) {
                    return res.ok({ data: "You were given 100 Referral points for starting the carpooling" });
                } else {
                    return callback("Could not provide you referral points.");
                }
            });
        }

        async.waterfall([
            giveReferralPointsForCarpoolingIntiative
        ], function(err) {
            if (err) {
                return res.badRequest({ exception: err });
            }
        });
    }

};
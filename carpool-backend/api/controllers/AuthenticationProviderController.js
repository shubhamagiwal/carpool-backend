/**
 * AuthenticationProviderController
 *
 * @description :: Server-side logic for managing Authenticationproviders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var md5 = require("md5");

module.exports = {

    update: function(req, res) {
        var password;
        var self = {};
        var userId = req.param("userId");
        if (req.body.password) {
            password = md5(req.body.password);
        } else {
            password = null;
        }

        function getUserDetails(callback) {
            User.find({
                where: { id: userId }
            }).then(function(response) {
                if (response) {
                    self.userDetails = response;
                    return callback(null);
                } else {
                    return callback("The given User does not exist");
                }
            });
        }

        function updatePassword(callback) {
            AuthenticationProvider.update({
                password: password,
            }, {
                where: {
                    id: self.userDetails.authenticationProviderId
                }
            }).then(function(response) {
                if (response) {
                    return callback(null);
                } else {
                    return callback("The update was not successful");
                }
            });
        }

        function responseCreation(callback) {
            return res.ok({ data: "The update was successful" });
        }

        async.waterfall([
            getUserDetails,
            updatePassword,
            responseCreation
        ], function(err) {
            if (err) {
                return res.badReques({ exception: err });
            }
        })

    }
};
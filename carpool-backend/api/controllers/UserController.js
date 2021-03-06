/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var md5 = require("md5");
var moment = require("moment");
var err = {};
var async = require("async");

module.exports = {

    login: function(req, res) {
        var phoneNumber = req.body.phoneNumber;
        var password = req.body.password;
        var encryptPassword;
        var accessToken;
        var self = {};


        function encryptPassword(callback) {
            encryptPassword = md5(password);
            return callback(null);
        }

        function verifyDetails(callback) {
            AuthenticationProvider.find({
                where: {
                    phone: phoneNumber,
                    password: encryptPassword
                }
            }).then(function(response) {
                if (response) {
                    self.authDetails = response;
                    return callback(null);
                } else {
                    err.exception = "The Phone number or password provided is incorrect";
                    return callback(err);
                }
            });
        }

        function getUserDetail(callback) {
            User.find({
                where: {
                    AuthenticationProviderId: self.authDetails.id
                }
            }).then(function(response) {
                if (response) {
                    self.userDetails = response;
                    return callback(null);
                } else {
                    return callback(null);
                }
            });
        }

        function generateAccessToken(callback) {
            accessToken = md5(moment().unix() + "-Car-pool");
            return callback(null);
        }

        function createAccessToken(callback) {
            AccessToken.create({
                token: accessToken,
                createdAt: sequelize.fn('NOW'),
                updatedAt: sequelize.fn('NOW'),
                userId: self.userDetails.id
            }).then(function(response) {
                if (response) {
                    self.accessTokenDetails = response;
                    return callback(null);
                } else {
                    err.exception = "Error in creating the access Token. Try again later";
                    return callback(err);
                }
            });
        }

        function getReferralPoint(callback) {
            var query = "SELECT SUM(point) as sum from UserPoints where UserPoints.userId=" + self.userDetails.id + " group by UserPoints.userId ";

            sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                .then(function(response) {
                    if (response.length > 0) {
                        self.points = response[0].sum;
                        return callback(null);
                    } else {
                        err.exception = "Could not create Referral Code";
                        return callback(err);
                    }
                });
        }

        function responseCreation(callback) {
            var response = {};
            response.userDetails = self.userDetails;
            response.userDetails.dataValues.points = self.points;
            response.authDetails = self.authDetails;
            response.accessTokenDetails = self.accessTokenDetails;
            return res.ok(response);
        }


        async.waterfall([
            encryptPassword,
            verifyDetails,
            getUserDetail,
            generateAccessToken,
            createAccessToken,
            getReferralPoint,
            responseCreation
        ], function(err) {
            if (err) {
                return res.badRequest(err);
            }
        });

    },

    signUp: function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phoneNumber;
        var stateId = req.body.stateId;
        var password = req.body.password;
        var self = {};
        var err = {};
        var accessToken;

        function encryptPassword(callback) {
            self.password = md5(password);
            return callback(null);
        }

        function authenticationDetailsCreate(callback) {
            AuthenticationProvider.create({
                email: email,
                phone: phone,
                isPhoneVerified: true,
                isEmailVerified: true,
                isBlocked: true,
                createdAt: sequelize.fn('NOW'),
                updatedAt: sequelize.fn('NOW'),
                activatedAt: sequelize.fn('NOW'),
                password: self.password
            }).then(function(response) {
                if (response) {
                    self.authDetails = response;
                    return callback(null);
                } else {
                    return callback("Unable to create the user.");
                }
            });
        }

        function userDetailsCreate(callback) {
            User.create({
                fullName: name,
                stateId: stateId,
                createdAt: sequelize.fn('NOW'),
                updatedAt: sequelize.fn('NOW'),
                authenticationProviderId: self.authDetails.id
            }).then(function(response) {
                if (response) {
                    self.userDetails = response;
                    return callback(null);
                } else {
                    return callback("Unable to create the user.");
                }
            });
        }

        function generateAccessToken(callback) {
            accessToken = md5(moment().unix() + "-Car-pool");
            return callback(null);
        }

        function createAccessToken(callback) {
            AccessToken.create({
                token: accessToken,
                createdAt: sequelize.fn('NOW'),
                updatedAt: sequelize.fn('NOW'),
                userId: self.userDetails.id
            }).then(function(response) {
                if (response) {
                    self.accessTokenDetails = response;
                    return callback(null);
                } else {
                    return callback("Error in creating the access Token. Try again later");
                }
            });
        }

        function createReferralPoint(callback) {
            UserPoint.create({
                userId: self.userDetails.id,
                point: 100
            }).then(function(response) {
                if (response) {
                    self.points = 100;
                    return callback(null);
                } else {
                    return callback("Could not create Referral Code");
                }
            });
        }


        function responseCreation(callback) {
            var response = {};
            response.userDetails = self.userDetails;
            response.userDetails.dataValues.points = self.points;
            response.authDetails = self.authDetails;
            response.accessTokenDetails = self.accessTokenDetails;
            return res.ok(response);
        }

        async.waterfall([
            encryptPassword,
            authenticationDetailsCreate,
            userDetailsCreate,
            generateAccessToken,
            createAccessToken,
            createReferralPoint,
            responseCreation
        ], function(err) {
            if (err) {
                return res.badRequest({ exception: err });
            }
        });

    },

    update: function(req, res) {
        var userId = req.body.userId;
        var email = req.body.email;
        var phone = req.body.phone;
        var fullName = req.body.fullName;
        var self = {};


        function updateUserDetail(callback) {
            if (fullName) {
                User.update({
                    fullName: fullName
                }, {
                    where: {
                        id: userId
                    }
                }).then(function(response) {
                    if (response) {
                        return callback(null);
                    } else {
                        return callback("Error User details could not be updated");
                    }
                });
            } else {
                return callback(null);
            }

        }

        function getUserDetail(callback) {
            User.find({
                where: {
                    id: userId
                }
            }).then(function(response) {
                if (response) {
                    self.userDetails = response;
                    return callback(null);
                } else {
                    return callback("Error User details could not be updated");
                }
            });
        }

        function updateAuthDetails(callback) {

            var options = {};

            if (email) {
                options.email = email;
            }

            if (phone) {
                options.phone = phone;
            }

            if (email || phone) {
                AuthenticationProvider.update(options, {
                    where: {
                        id: self.userDetails.authenticationProviderId
                    }
                }).then(function(response) {
                    if (response) {
                        self.authDetails = response;
                        return callback(null);
                    } else {
                        return callback("Error User details could not be updated");
                    }
                });
            } else {
                return callback(null);
            }

        }


        function getAuthDetails(callback) {
            AuthenticationProvider.find({
                where: {
                    id: self.userDetails.authenticationProviderId
                }
            }).then(function(response) {
                if (response) {
                    self.authDetails = response;
                    return callback(null);
                } else {
                    return callback("Error User details could not be updated");
                }
            });
        }

        function getReferralPoint(callback) {
            var query = "SELECT SUM(point) as sum from UserPoints where UserPoints.userId=" + self.userDetails.id + " group by UserPoints.userId ";

            sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                .then(function(response) {
                    if (response.length > 0) {
                        self.points = response[0].sum;
                        return callback(null);
                    } else {
                        return callback("Error User details could not be updated");
                    }
                });
        }

        function getAccessTokenDetail(callback) {
            AccessToken.find({
                where: {
                    token: req.body.token
                }
            }).then(function(response) {
                if (response) {
                    self.accessTokenDetails = response;
                    return callback(null);
                } else {
                    return callback("Error User details could not be updated");
                }
            })
        }

        function responseCreation(callback) {
            var response = {};
            response.userDetails = self.userDetails;
            response.userDetails.dataValues.points = self.points;
            response.authDetails = self.authDetails;
            response.accessTokenDetails = self.accessTokenDetails;
            return res.ok(response);
        }

        async.waterfall([
            updateUserDetail,
            getUserDetail,
            updateAuthDetails,
            getAuthDetails,
            getReferralPoint,
            getAccessTokenDetail,
            responseCreation
        ], function(err) {
            if (err) {
                return res.badRequest({ exception: err });
            }
        });

    }

};
/**
 * UserLocationController
 *
 * @description :: Server-side logic for managing Userlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function(req, res) {
        var query = req.query;

        function getAllDetails(callback) {
            var requestQuery = 'select userLocations.id as "userLocationsId",userLocations.latitude as "userLat",' +
                ' userLocations.longitude as "userLong",userLocations.userId,userLocations.schoolId, ' +
                ' users.fullName as name, users.picture,users.stateId,users.isStateIdVerified, ' +
                ' authenticationProviders.id as authId, authenticationProviders.email, authenticationProviders.phone, ' +
                ' schools.name as schoolName,schools.address as schoolAddress, schools.latitude as "schoollLat",schools.longitude as "schoolLong"' +
                ' from UserLocations as userLocations' +
                ' left join Users as users on users.id = userLocations.userId' +
                ' left join AuthenticationProviders as authenticationProviders on authenticationProviders.id = users.authenticationProviderId ' +
                ' left join Schools as schools on schools.id = userLocations.schoolId' +
                ' where userLocations.isComplete = false and DATE(userLocations.createdAt) = DATE(UTC_TIMESTAMP())';
            if (query.id) {
                requestQuery += " and schools.id=" + req.query.id;
            }

            sequelize.query(requestQuery, { type: sequelize.QueryTypes.SELECT })
                .then(function(response) {
                    if (response.length > 0) {
                        var data = response;
                        return res.ok({ data: data });
                    } else {
                        return callback("We do not have anyone carpooling right now");
                    }
                });
        }

        async.waterfall([getAllDetails], function(err) {
            if (err) {
                return res.badRequest({ exception: err });
            }
        });
    }
};
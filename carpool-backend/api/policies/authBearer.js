module.exports = function(req, res, next) {
    var token = req.body.token;

    var options = {
        where: {
            token: token
        }
    };

    AccessToken.find(options).then(function(response) {
        if (response) {
            next();
        } else {
            return res.badRequest({ exception: "Not Authorized" });
        }
    });
};
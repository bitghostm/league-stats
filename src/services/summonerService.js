var rp = require('request-promise');
var _ = require('underscore');
var leagueApiUrls = require('../config/leagueApiUrls');


var summonerService = function (req, res, next) {
    var summonerName = req.params.name;
    rp(leagueApiUrls.getUrlForKey('na', 'getSummonerByName', summonerName)).then(function (result) {
        console.log(result);
    });
    return next();
};

module.exports = summonerService;
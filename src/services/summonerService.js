var rp = require('request-promise');
var _ = require('underscore');
var leagueApiUrls = require('../config/leagueApiUrls');
var Promise = require('bluebird');
var region = 'na';

var summonerService = function (req, res, next) {
    var summonerName = req.params.name;
    var summonerId = '';
    return rp(leagueApiUrls.getUrlForKey(region, 'getSummonerByName', summonerName))
        .then(function (result) {
            result = JSON.parse(result);
            summonerId = result[summonerName].id;
            return rp(leagueApiUrls.getUrlForKey(region, 'getMatchListBySid', summonerId))
                .then(function (result) {
                    result = JSON.parse(result);
                    return Promise.map(result.matches, function (match) {
                        return rp(leagueApiUrls.getUrlForKey(region, 'getMatchById', match.matchId));
                    }, {concurrency: 1})
                    .then(function (result) {
                        console.log(result);
                    });
                });
        }).catch(function (err) {
            console.log(err);
            return next();
        });
};

module.exports = summonerService;
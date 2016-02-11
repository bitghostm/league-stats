var rp = require('request-promise');
var _ = require('underscore');
var leagueApiUrls = require('../config/leagueApiUrls');
var Promise = require('bluebird');
var region = 'na';
var season = '2016';

function fetchRecentMatches(summonerId) {
    return fetch(summonerId, 'getRecentMatches');
}

function fetchSummaryStat(summonerId) {
    return fetch(summonerId, 'getSummaryStat');
}

function fetchRankedStat(summonerId) {
    return fetch(summonerId, 'getRankedStat');
}

function fetchLeagueStat(summonerId) {
    return fetch(summonerId, 'getLeagueStatBySid');
}

function fetch(searchKey, urlName) {
    return rp(leagueApiUrls.getUrlForKey(region, urlName, searchKey, season))
        .then(function (result) {
            result = JSON.parse(result);
            return result;
        });
}

var summonerService = function (req, res, next) {
    var summonerName = req.params.name;

    return rp(leagueApiUrls.getUrlForKey(region, 'getSummonerByName', summonerName))
        .then(function (result) {
            result = JSON.parse(result);
            var summonerId = result[summonerName].id;
            req.summonerData =  req.summonerData || {};
            req.summonerData.profile = result[summonerName];

            return Promise.all([fetchRecentMatches(summonerId), fetchSummaryStat(summonerId), fetchRankedStat(summonerId), fetchLeagueStat(summonerId)])
                .spread(function (recentMatches, summaryStat, rankedStat, leagueStat) {
                    req.summonerData.recentMatches = recentMatches.games;
                    req.summonerData.summaryStat = summaryStat.playerStatSummaries;
                    req.summonerData.rankedStat = rankedStat.champions;
                    req.summonerData.summonerRankedStat = _.find(leagueStat[summonerId][0].entries, function (entry) {
                        return parseInt(entry.playerOrTeamId, 10) === summonerId;
                    });
                    req.summonerData.leagueStat = leagueStat[summonerId][0];
                    return next();
                });
        }).catch(function (err) {
            console.log(err);
            return next();
        });
};

module.exports = summonerService;
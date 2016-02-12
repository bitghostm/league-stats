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

function fetchChampionData() {
    return fetch('', 'getChampion');
}

function fetch(searchKey, urlName) {
    return rp(leagueApiUrls.getUrlForKey(region, urlName, searchKey, season))
        .then(function (result) {
            result = JSON.parse(result);
            return result;
        }).catch(function (err) {
            console.log(err);
            return {};
        });
}


var summonerService = function (req, res, next) {
    var summonerName = req.params.name.trim().toLowerCase().replace(/\s/g, '');

    return rp(leagueApiUrls.getUrlForKey(region, 'getSummonerByName', summonerName))
        .then(function (result) {
            result = JSON.parse(result);
            var summonerId = result[summonerName].id;
            req.summonerData =  req.summonerData || {};
            req.summonerData.profile = result[summonerName];

            return Promise.all([fetchRecentMatches(summonerId), fetchSummaryStat(summonerId), fetchRankedStat(summonerId), fetchLeagueStat(summonerId), fetchChampionData()])
                .spread(function (recentMatches, summaryStat, rankedStat, leagueStat, championData) {
                    var championMap = buildChampionMap(championData.data);
                    req.summonerData.recentMatches = _.map(recentMatches.games, function (game) {
                        game.championName = championMap[game.championId];
                        game.fellowPlayers = _.map(game.fellowPlayers, function (player) {
                            player.championName = championMap[player.championId];
                            return player;
                        });
                        return game;
                    });
                    req.summonerData.summaryStat = summaryStat.playerStatSummaries;
                    req.summonerData.rankedStat = _.map(rankedStat.champions, function (champion) {
                        var championName = champion.id === 0 ? '' : championMap[champion.id];
                        var stats = champion.stats;
                        stats.championName = championName;
                        stats.championId = champion.id;
                        return stats;
                    });
                    req.summonerData.rankedStatByChampion = _.filter(req.summonerData.rankedStat, function (stat) {
                        return  stat.championId !== 0;
                    });
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

function buildChampionMap(championData) {
    if (championData) {
        var championMap = [];
        _.each(championData, function (data) {
            console.log(data.name);
            championMap[data.id] = data.name.replace(/\s/g, '');;
        });
        return championMap;
    }

    return [];
}

module.exports = summonerService;
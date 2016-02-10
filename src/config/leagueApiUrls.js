var config = require('./config.js');

var urls = {
    getSummonerByName: 'https://na.api.pvp.net/api/lol/{region}/v1.4/summoner/by-name/',
    getMatchListBySid: 'https://na.api.pvp.net/api/lol/{region}/v2.2/matchlist/by-summoner/',
    getMatchById: 'https://na.api.pvp.net/api/lol/{region}/v2.2/match/',
    getRecentMatches: 'https://na.api.pvp.net/api/lol/{region}/v1.3/game/by-summoner/',
    getChampionById: 'https://na.api.pvp.net/api/lol/static-data/{region}/v1.2/champion/',
    getSummaryStat: 'https://na.api.pvp.net/api/lol/{region}/v1.3/stats/by-summoner/',
    getRankedStat: 'https://na.api.pvp.net/api/lol/{region}/v1.3/stats/by-summoner/',
    getLeagueStatBySid: 'https://na.api.pvp.net/api/lol/{region}/v2.5/league/by-summoner/'
};

var seasons = {
    3: 'SEASON3',
    2014: 'SEASON2014',
    2015: 'SEASON2015',
    2016: 'SEASON2016'
};

module.exports = {
    getUrlForKey: function (region, urlName, searchKey, season) {
        var url = '';
        var urlSeason = 'season=' + seasons[season];
        switch (urlName) {
            case 'getRecentMatches':
                url = urls[urlName] + searchKey + '/recent' + '?' + 'api_key=' + config.leagueAPI;
                break;
            case 'getSummaryStat':
                url = urls[urlName] + searchKey + '/summary' + '?' + urlSeason + '&' + 'api_key=' + config.leagueAPI;
                break;
            case 'getRankedStat':
                url = urls[urlName] + searchKey + '/ranked' + '?' + urlSeason + '&' + 'api_key=' + config.leagueAPI;
                break;
            default:
                url = urls[urlName] + searchKey + '?' + 'api_key=' + config.leagueAPI;
                break;
        }
        return url.replace('{region}', region);
    }
};

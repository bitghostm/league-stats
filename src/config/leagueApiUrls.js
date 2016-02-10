var config = require('./config.js');

var urls = {
    getSummonerByName: 'https://na.api.pvp.net/api/lol/{region}/v1.4/summoner/by-name/',
    getMatchListBySid: 'https://na.api.pvp.net/api/lol/{region}/v2.2/matchlist/by-summoner/',
    getChampionById: 'https://na.api.pvp.net/api/lol/static-data/{region}/v1.2/champion/'
};

module.exports = {
    getUrlForKey: function (region, urlName, searchKey) {
        var url = urls[urlName] + searchKey + '?' + 'api_key=' + config.leagueAPI;
        return url.replace('{region}', region);
    }
};

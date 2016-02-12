var React = require('react');
var config = require('../config/config');
var camelize = require('underscore.string/camelize');
var _ = require('underscore');

var s3BaseUrl = config.s3BaseUrl;

var matchesPanel = React.createClass({
    getInitialState: function () {
        var matchData = this.props.matchStats;

        var subType = matchData.subType;
        var gameType = '';
        var kill = matchData.stats.championsKilled ? parseFloat(matchData.stats.championsKilled) : 0;
        var death = matchData.stats.numDeaths ? parseFloat(matchData.stats.numDeaths) : 0;
        var assists = matchData.stats.assists ? parseFloat(matchData.stats.assists) : 0;
        var kda = death !== 0 ? ((kill+assists) / death).toFixed(2) : 0;

        console.log(kill, ' ', death, ' ', assists);
        if (subType.indexOf('NORMAL') !== -1) {
            gameType = 'Normal';
        } else if (subType.indexOf('RANKED') !== -1 && subType.indexOf('UNRANKED') === -1) {
            gameType = 'Ranked';
        } else if (subType.indexOf('BOT') !== -1) {
            gameType = 'Bot';
        } else if (subType.indexOf('NONE') !== -1) {
            gameType = "Custom";
        } else {
            gameType = camelize(matchData.gameMode);
        }

        matchData.gameTypeString = gameType;
        matchData.stats.kda = kda;
        return {
            summonerSpellBaseUrl: s3BaseUrl + '/spell/',
            itemBaseUrl: s3BaseUrl + '/item/',
            match: matchData,
            stats: matchData.stats
        };
    },

    render: function() {
        return (
            <div className="row">
                <div className= {"panel panel-default " + (this.state.stats.win ? 'match-win' : 'match-lose')}>
                    <div className="panel-heading">
                            <span className="panel-heading-name">{this.state.match.gameTypeString}</span>
                            <span className={'pull-right ' + (this.state.stats.win ? 'font-green-color' : 'font-red-color')}>{this.state.stats.win ? 'Victory' : 'Defeat'}</span>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-1 col-sm-1">
                                <img className='img-circle match-champion-icon' src={s3BaseUrl + '/champion/' + this.state.match.championName + '.png'} alt="icon"/>
                                <div className='match-champion-name'>{this.state.match.championName}</div>
                            </div>
                            <div className="col-md-1 col-sm-1">
                                <img className='img-rounded match-spell-icon' src={this.state.summonerSpellBaseUrl + this.state.match.spell1 + '.png'} alt="icon"/>
                                <img className='img-rounded match-spell-icon' src={this.state.summonerSpellBaseUrl + this.state.match.spell2 + '.png'} alt="icon"/>
                            </div>
                            <div className="col-md-2 col-sm-2 font-grey-color">
                                <div className="match-kills-stats">
                                    <span className=" font-green-color">{this.state.stats.championsKilled || 0}</span> / <span className="font-red-color">{this.state.stats.numDeaths || 0}</span> / <span>{this.state.stats.assists || 0}</span>
                                </div>
                                <div>
                                    {
                                        this.state.stats.kda !== 0
                                            ?
                                            <span className='match-kda'>
                                                <span className='match-kda-number'>{this.state.stats.kda}</span> KDA
                                            </span>
                                            : <span></span>
                                    }
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = matchesPanel;
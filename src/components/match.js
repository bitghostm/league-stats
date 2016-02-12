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

        var team1=[];
        var team2=[];

        if (matchData.fellowPlayers) {
            team1 = _.filter(matchData.fellowPlayers, function (player) {
                return parseInt(player.teamId) === 100;
            });

            team2 = _.filter(matchData.fellowPlayers, function (player) {
                return parseInt(player.teamId) === 200;
            });

            if (team1.length === 4) {
                team1.push({'championName': matchData.championName, 'teamId': 100});
            } else {
                team2.push({'championName': matchData.championName, 'teamId': 200});
            }
        }




        return {
            summonerSpellBaseUrl: s3BaseUrl + '/spell/',
            itemBaseUrl: s3BaseUrl + '/item/',
            championBaseUrl: s3BaseUrl + '/champion/',
            match: matchData,
            stats: matchData.stats,
            team1: team1,
            team2: team2
        };
    },
    render: function() {
        return (
            <div className="row">
                <div className="container col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div className= {"panel panel-default " + (this.state.stats.win ? 'match-win' : 'match-lose')}>
                        <div className="panel-heading">
                            <span className="panel-heading-name">{this.state.match.gameTypeString}</span>
                            <span className={'pull-right ' + (this.state.stats.win ? 'font-green-color' : 'font-red-color')}>{this.state.stats.win ? 'Victory' : 'Defeat'}</span>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-1 col-sm-1">
                                    <img className='img-circle match-champion-icon' src={this.state.championBaseUrl + this.state.match.championName + '.png'} alt="icon"/>
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
                                <div className="col-md-1 col-sm-1 font-grey-color match-level">
                                    <div>Level <span className="match-kda-number">{this.state.stats.level}</span></div>
                                    <div><span className="match-kda-number">{this.state.stats.goldEarned} </span><span className='match-gold'>G</span></div>
                                    <div><span className="match-kda-number">{this.state.stats.minionsKilled}</span> CK</div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <div className="row">
                                        <div className="col-lg-7 col-md-10 col-sm-10 match-items">
                                            <div>
                                                {this.state.stats.item0 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item0 + '.png'} alt="icon"></img> : <span></span>}
                                                {this.state.stats.item1 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item1 + '.png'} alt="icon"></img> : <span></span>}
                                                {this.state.stats.item2 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item2 + '.png'} alt="icon"></img> : <span></span>}
                                            </div>
                                            <div>
                                                {this.state.stats.item3 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item3 + '.png'} alt="icon"></img> : <span></span>}
                                                {this.state.stats.item4 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item4 + '.png'} alt="icon"></img> : <span></span>}
                                                {this.state.stats.item5 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item5 + '.png'} alt="icon"></img> : <span></span>}
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-sm-2 match-trinket">
                                            {this.state.stats.item6 ? <img className='img-rounded match-item-icon' src={this.state.itemBaseUrl + this.state.stats.item6 + '.png'} alt="icon"></img> : <span></span>}

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 font-grey-color match-players">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            {
                                                this.state.team1 ? <TeamComponent teamData={this.state.team1} championBaseUrl={this.state.championBaseUrl}/> : <div></div>
                                            }
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            {
                                                this.state.team2 ? <TeamComponent teamData={this.state.team2} championBaseUrl={this.state.championBaseUrl}/> : <div></div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var TeamComponent = React.createClass({
    getInitialState: function () {
        var teamData = this.props.teamData;
        var teamComponent = [];
        var that = this;
        _.each(teamData, function (data) {
            teamComponent.push(<div><img className='img-rounded match-player-icon' src={that.props.championBaseUrl + data.championName + '.png'} alt="icon"></img> {data.championName}</div>);
        });
        return {
            teamComponent: teamComponent
        };
    },
    render: function () {
        return (
            <div>
                {this.state.teamComponent}
            </div>
        );
    }
});

module.exports = matchesPanel;
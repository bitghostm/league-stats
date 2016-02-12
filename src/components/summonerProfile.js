var React = require('react');
var config = require('../config/config');

var s3BaseUrl = config.s3BaseUrl;

var summonerProfile = React.createClass({
    getInitialState: function () {
        return {
            profileIconId: this.props.profile.profileIconId,
            summonerName: this.props.profile.name,
            summonerLevel: this.props.profile.summonerLevel,
            division: '',
            leaguePoints: '',
            wins: '',
            losses: '',
            leagueStatTier: '',
            leagueStatQueue: '',
            leagueStateName: ''
        };
    },
    render: function() {
        if (this.props.leagueStat) {
            this.state.leagueStatTier = this.props.leagueStat.tier;
            this.state.leagueStatQueue = this.props.leagueStat.queue;
            this.state.leagueStatName = this.props.leagueStat.name;
        }

        if (this.props.summonerRankedStat) {
            this.state.division = this.props.summonerRankedStat.division;
            this.state.leaguePoints = this.props.summonerRankedStat.leaguePoints;
            this.state.wins = this.props.summonerRankedStat.wins;
            this.state.losses = this.props.summonerRankedStat.losses;
        }
        return (
            <section className='row jumbotron profile-section'>
                <div className='profile-icon col-lg-2 col-md-2 col-sm-3'>
                    <img src={s3BaseUrl + '/profileicon/' + this.state.profileIconId + '.png'} alt="profile icon" className="img-rounded"/>
                </div>
                <div className='profile-info col-md-4 col-sm-4'>
                    <div className='profile-info-name'>{this.state.summonerName}</div>
                    <div>Level <span className='profile-info-level'>{this.state.summonerLevel}</span></div>
                </div>
                {
                    this.props.leagueStat ?
                    <div className='profile-ranked-info col-md-4 col-sm-4'>
                        <div className='profile-ranked-info-tier'><span className="profile-ranked-info-tier">{this.state.leagueStatTier}</span> {this.state.division}</div>
                        <div className='profile-ranked-info-lp'><span className="profile-ranked-info-lp-number">{this.state.leaguePoints}</span> LP</div>
                        <div className='profile-ranked-info-win-lose'>{this.state.wins}<span className="profile-ranked-win"> W</span> / {this.state.losses}<span className="profile-ranked-lose"> L</span></div>
                        <div className='profile-ranked-info-lp'>{this.state.leagueStatName}</div>
                    </div>
                        :
                    <div className='profile-ranked-info col-md-4 col-sm-4'></div>
                }
            </section>
        );
    }
});

module.exports = summonerProfile;

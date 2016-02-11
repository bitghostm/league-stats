var React = require('react');
var config = require('../config/config');

var s3BaseUrl = config.s3BaseUrl;

var summonerProfile = React.createClass({
    getInitialState: function () {
        return {
            profileIconId: this.props.profile.profileIconId,
            summonerName: this.props.profile.name,
            summonerLevel: this.props.profile.summonerLevel,
            summonerRankedStat: this.props.summonerRankedStat,
            leagueStatTier: this.props.leagueStat.tier,
            leagueStatQueue: this.props.leagueStat.queue,
            leagueStateName: this.props.leagueStat.name
        };
    },
    render: function() {
        return (
            <section className='row jumbotron profile-section'>
                <div className='profile-icon col-md-4 col-sm-4'>
                    <img src={s3BaseUrl + '/profileicon/' + this.state.profileIconId + '.png'} alt="profile icon" className="img-rounded"/>
                </div>
                <div className='profile-info col-md-4 col-sm-4'>
                    <div className='profile-info-name'>{this.state.summonerName}</div>
                    <div className='profile-info-name'>Level {this.state.summonerLevel}</div>
                </div>
                <div className='profile-ranked-info col-md-4 col-sm-4'>
                    <div className='profile-ranked-info-tier'>{this.state.leagueStatTier} {this.state.summonerRankedStat.division}</div>
                    <div className='profile-ranked-info-lp'>{this.state.summonerRankedStat.leaguePoints} LP</div>
                    <div className='profile-ranked-info-win-loss'>{this.state.summonerRankedStat.wins}W/{this.state.summonerRankedStat.losses}L</div>
                    <div className='profile-ranked-info-lp'>{this.state.leagueStatName}</div>
                </div>
            </section>
        );
    }
});

module.exports = summonerProfile;

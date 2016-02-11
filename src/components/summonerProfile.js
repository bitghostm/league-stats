var React = require('react');
var config = require('../config/config');

var s3BaseUrl = config.s3BaseUrl;

var summonerProfile = React.createClass({
    getInitialState: function () {
        return {
            profileIconId: this.props.profile.profileIconId,
            summonerName: this.props.profile.name,
            summonerLevel: this.props.profile.summonerLevel
        };
    },
    render: function() {
        return (
            <section className='row profile-section'>
                <div className='profile-icon col-md-4 col-sm-4'>
                    <img src={s3BaseUrl + '/profileicon/' + this.state.profileIconId + '.png'} alt="profile icon" className="img-rounded"/>
                </div>
                <div className='profile-info col-md-8 col-sm-4'>
                    <span className='profile-info-name'>{this.state.summonerName}</span>
                    <span className='profile-info-name'>Level {this.state.summonerLevel}</span>
                </div>

            </section>
        );
    }
});

module.exports = summonerProfile;

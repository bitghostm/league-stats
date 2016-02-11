var React = require('react');
var SummonerProfile = require('./summonerProfile');

var SummonerPage = React.createClass({
    getInitialState: function () {
        return {
            summonerData: appData.summonerData
        };
    },
    render: function() {
        return (
            <div className='container'>
                <SummonerProfile profile={this.state.summonerData.profile} summonerRankedStat={this.state.summonerData.summonerRankedStat} leagueStat={this.state.summonerData.leagueStat}/>
            </div>
        );
    }
});

module.exports = SummonerPage;
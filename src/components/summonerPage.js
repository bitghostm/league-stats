var React = require('react');
var SummonerProfile = require('./summonerProfile');
var StatBoardMain = require('./statBoardMain');


var SummonerPage = React.createClass({
    getInitialState: function () {
        return {
            summonerData: appData.summonerData
        };
    },
    render: function() {
        console.log('summonerData: ', this.state.summonerData);
        return (
            <div className='container'>
                <SummonerProfile profile={this.state.summonerData.profile} summonerRankedStat={this.state.summonerData.summonerRankedStat} leagueStat={this.state.summonerData.leagueStat}/>
                <StatBoardMain summonerData={this.state.summonerData}/>
            </div>
        );
    }
});

module.exports = SummonerPage;
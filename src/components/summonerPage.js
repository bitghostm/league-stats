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
            <div className='header-section'>
                <div className='container'>
                    <SummonerProfile profile={this.state.summonerData.profile} summonerRankedStat={this.state.summonerData.summonerRankedStat} leagueStat={this.state.summonerData.leagueStat}/>
                </div>
                <div className=''>
                    <StatBoardMain summonerData={this.state.summonerData}/>
                </div>
            </div>
        );
    }
});

module.exports = SummonerPage;
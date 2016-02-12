var React = require('react');
var SummonerProfile = require('./summonerProfile');
var StatBoardMain = require('./statBoardMain');
var TopSearchBar = require('./topSearchBar');


var SummonerPage = React.createClass({
    getInitialState: function () {
        return {
            summonerData: appData.summonerData
        };
    },
    render: function() {
        return (
            <div>
                <TopSearchBar />
                {
                    this.state.summonerData && this.state.summonerData.profile ?
                    <div className='header-section'>
                        <div className='container'>
                            <SummonerProfile profile={this.state.summonerData.profile} summonerRankedStat={this.state.summonerData.summonerRankedStat} leagueStat={this.state.summonerData.leagueStat}/>
                        </div>
                        <div className=''>
                            <StatBoardMain summonerData={this.state.summonerData}/>
                        </div>
                    </div>
                    :
                    <div className="error-holder">
                        <div className="alert alert-danger" role="alert">
                            Summoner {this.state.summonerData.summonerName} not found.
                        </div>
                    </div>
                }
            </div>
        );
    }
});

module.exports = SummonerPage;
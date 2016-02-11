var React = require('react');
var config = require('../config/config');
var Griddle = require('griddle-react');

var s3BaseUrl = config.s3BaseUrl;

var rankedStatPanel = React.createClass({
    getInitialState: function () {
        return {
            rankedData: this.props.rankedStatByChampion
        };
    },

    render: function() {
        return (
            <section className='row stat-board-section'>
                <Griddle results={this.state.rankedData} useGriddleStyles={false} columns={["championName", "totalSessionsWon", "totalSessionsLost", "totalChampionKills", "totalDeathsPerSession", "totalAssists", "totalMinionKills", "totalGoldEarned"]} />
            </section>
        );
    }
});

module.exports = rankedStatPanel;
var React = require('react');
var config = require('../config/config');
var Griddle = require('griddle-react');
var ChampionColumn = require('./championColumn');

var s3BaseUrl = config.s3BaseUrl;

var columnMetadata = [{
    'columnName': 'championName',
    'displayName': 'Champion',
    'customComponent': ChampionColumn
}, {
    'columnName': 'totalSessionsWon',
    'displayName': 'Win'
}, {
    'columnName': 'totalSessionsLost',
    'displayName': 'Lose'
}, {
    'columnName': 'totalChampionKills',
    'displayName': 'Kill'
}, {
    'columnName': 'totalDeathsPerSession',
    'displayName': 'Death'
}, {
    'columnName': 'totalAssists',
    'displayName': 'Assists'
}, {
    'columnName': 'totalMinionKills',
    'displayName': 'CS'
}, {
    'columnName': 'totalGoldEarned',
    'displayName': 'Gold'
}];


var rankedStatPanel = React.createClass({
    getInitialState: function () {
        return {
            rankedData: this.props.rankedStatByChampion
        };
    },

    render: function() {
        return (
            <section className='row stat-board-section'>
                <Griddle results={this.state.rankedData} useGriddleStyles={false} columnMetadata={columnMetadata}
                         noDataMessage={"No ranked data is available."} resultsPerPage={config.resultsPerPage}
                         columns={["championName", "totalSessionsWon", "totalSessionsLost", "totalChampionKills", "totalDeathsPerSession", "totalAssists", "totalMinionKills", "totalGoldEarned"]} />
            </section>
        );
    }
});

module.exports = rankedStatPanel;
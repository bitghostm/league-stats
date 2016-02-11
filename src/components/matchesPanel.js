var React = require('react');
var config = require('../config/config');

var s3BaseUrl = config.s3BaseUrl;

var matchesPanel = React.createClass({
    getInitialState: function () {
        return {
            statBoardNav: 'summary'
        };
    },

    render: function() {
        return (
            <section className='row stat-board-section'>
                <h1>matchesPanel</h1>
            </section>
        );
    }
});

module.exports = matchesPanel;
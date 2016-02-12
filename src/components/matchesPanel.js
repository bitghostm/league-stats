var React = require('react');
var config = require('../config/config');
var Match = require('./match');

var s3BaseUrl = config.s3BaseUrl;

var matchesPanel = React.createClass({
    getInitialState: function () {
        return {
        };
    },

    render: function() {
        var matches = [];
        this.props.recentMatches.forEach(function (match) {
            matches.push(<Match matchStats={match}/>)
        });
        return (
            <section className='row stat-board-section'>
                <div>{matches}</div>
            </section>
        );
    }
});

module.exports = matchesPanel;
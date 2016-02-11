var React = require('react');
var config = require('../config/config');

var s3BaseUrl = config.s3BaseUrl;

var statBoardMain = React.createClass({
    getInitialState: function () {
        return {

        };
    },
    render: function() {
        return (
            <section className='row stat-board-section'>

            </section>
        );
    }
});

module.exports = statBoardMain;

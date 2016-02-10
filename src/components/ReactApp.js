var React = require('react');

/* create factory with griddle component */

var resultsPerPage = 200;

var ReactApp = React.createClass({

    componentDidMount: function () {
    },
    render: function () {
        return (
            <div id="table-area">

                <h1>This is React</h1>

            </div>
        )
    }
});

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;
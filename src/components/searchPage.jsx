var React = require('react');

var Search = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },
    render: function() {
        return (

                <div className="search-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Enter the Summoner's name"/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button">
                                        Search
                                    </button>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        );
    }
});

module.exports = Search;
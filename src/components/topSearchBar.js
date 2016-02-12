var React = require('react');

var TopSearchBar = React.createClass({
    getInitialState: function () {
        return {
            searchName: ''
        };
    },
    handleSearchClick: function () {
        if (this.state.searchName.trim()) {
            window.location = this.state.searchName.trim();
        }
    },
    handleSearchChange: function (event) {
        this.setState({
            searchName: event.target.value
        });
    },
    handleEnter: function(e) {
        var ENTER = 13;
        if( e.keyCode == ENTER ) {
            this.handleSearchClick();
        }
    },
    render: function() {
        return (
            <div className="top-search-bar-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-8 top-search-bar">
                            <div className="input-group">
                                <input type="text" className="form-control" onKeyDown={this.handleEnter} value={this.state.searchName} onChange={this.handleSearchChange} placeholder="Enter the Summoner's name"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" onClick={this.handleSearchClick} type="submit">
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

module.exports = TopSearchBar;
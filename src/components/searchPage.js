var React = require('react');

var SearchPage = React.createClass({
    getInitialState: function () {
        return {
            searchName: ''
        };
    },
    handleSearchClick: function () {
        window.location = 'summoner/' + this.state.searchName;
    },
    handleSearchChange: function (event) {
        this.setState({
            searchName: event.target.value
        });
    },
    render: function() {
        return (
            <div className="search-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control" value={this.state.searchName} onChange={this.handleSearchChange} placeholder="Enter the Summoner's name"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" onClick={this.handleSearchClick} type="button">
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

module.exports = SearchPage;
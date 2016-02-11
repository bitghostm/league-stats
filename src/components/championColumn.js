var React = require('react');
var config = require('../config/config');

var s3BaseUrl = config.s3BaseUrl;

var championColumn = React.createClass({
    render: function() {
        return (
            <span>
                <img className='img-rounded champion-column-icon' src={s3BaseUrl + '/champion/' + this.props.data + '.png'} alt="profile icon"/>
                <span> {this.props.data}</span>
            </span>
        );
    }
});

module.exports = championColumn;

var React = require('react');
var GotchaButton = require('./GotchaButton');

var Home = React.createClass({
    render: function() {
        return (<GotchaButton user={this.props.user}/>);
    }
});
module.exports = Home;

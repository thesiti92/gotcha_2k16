var React = require('react');
var firebase = require("firebase/app");
require("firebase/auth");
var reactfire = require('reactfire');

var UserContent = React.createClass({
    mixins: [reactfire],
    getInitialState: function() {
        return {text: 'text'};
    },
    gotcha: function(e) {
      e.preventDefault();
        this.setState({
            text: "gotcha"
        });
    },
    render: function() {
        return (
            <button onClick={this.gotcha}>
                {this.state.text}
            </button>
        );
    }
});

module.exports = UserContent;

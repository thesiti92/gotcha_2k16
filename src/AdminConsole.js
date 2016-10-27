var React = require('react');
var firebase = require("firebase/app");
require("firebase/auth");
var ResetDb = require('./resetDb');

var AdminConsole = React.createClass({
    render: function() {
        return (<ResetDb/>);
    }
});

module.exports = AdminConsole;

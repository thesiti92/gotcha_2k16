var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require("firebase/app");
require("firebase/database");
const crypto = require('crypto');
var Floater = require('material-ui/FloatingActionButton').default;
var GotIcon = require('material-ui/svg-icons/action/pan-tool').default;
var Alert = ("./YesNoAlert");
const bStyle = {
    position: 'fixed',
    bottom: 20,
    right: 20
};

var GotchaButton = React.createClass({
    getInitialState: function() {
        this.db = firebase.database();
        return {};
    },
    gotcha: function() {
        console.log(this.props.user.email);
        var user = this.props.user;
        var decipher = crypto.createDecipher("aes192", user.email);
        decipher.update(user.attacker, "latin1", "utf8");
        var a = decipher.final("utf8");
        console.log(a);
        this.db.ref(user['.key']).update({alive: 0});
        this.db.ref(user.target).update({attacker: a});
        var attacker = this.db.ref(a);
        attacker.update({target: user.target});
        attacker.child("tags").transaction(function(curTags) {
            return curTags + 1;
        });
    },
    confirm: function() {
        ReactDOM.render(
            <Alert prompt="By accepting this prompt you CONFIRM that someone tagged you, and YOU are out." yesAct={this.gotcha} muiTheme={this.context.muiTheme}/>, document.getElementbyId('alert'));
    },
    render: function() {
        return (
            <Floater style={bStyle} onTouchTap={this.gotcha}>
                <GotIcon/>
            </Floater>
        );
    }
});
module.exports = GotchaButton;

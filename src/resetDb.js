var React = require('react');
var firebase = require("firebase/app");
require("firebase/database");
const crypto = require('crypto');
var ResetDbButton = React.createClass({
    getInitialState: function() {
        this.db = firebase.database();
        return {};
    },
    resetDb: function() {
        var users = require('/mnt/c/Users/aians/Documents/gotcha_2k16/data_management/gotcha.json');
        var toAssign = Object.assign({}, users);
        var target;
        var attacker = "Alexander Iansiti";
        while (Object.keys(toAssign).length !== 0) {
            var keys = Object.keys(toAssign);
            target = keys[keys.length * Math.random() << 0];
            users[attacker].target = target;
            var targetDict = users[target];
            var cipher = crypto.createCipher("aes192", targetDict.email);
            cipher.update(attacker, 'utf8', 'latin1');
            targetDict.attacker = cipher.final('latin1');
            targetDict.tags = 0;
            targetDict.violations = 0;
            targetDict.alive = 1;
            if (targetDict.nick.length === 0) {
                targetDict.displayName = target;
            } else {
                targetDict.displayName = targetDict.nick + " " + target.split(" ")[1];
            }
            attacker = target.slice(0);
            delete toAssign[target];
        }
        var ref = this.db.ref();
        ref.remove();
        ref.set(users);
    },
    render: function() {
        return (
            <button onClick={this.resetDb}>Reset DB</button>
        );
    }
});

module.exports = ResetDbButton;

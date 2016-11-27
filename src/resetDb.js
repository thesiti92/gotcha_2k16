var React = require('react');
var firebase = require("firebase/app");
require("firebase/database");
const crypto = require('crypto');


var ResetDbButton = React.createClass({
    getInitialState: function() {
        this.db = firebase.database();
        return {};
    },
    confirm: function(){
      if(confirm("Reset the entire Gotcha Database and reshuffle all targets?"))
      {
        this.resetDb();
      }
    },
    resetDb: function() {
        var users = require('/mnt/c/Users/aians/Documents/gotcha_2k16/data_management/gotcha.json');
        var toAssign = Object.assign({}, users);
        var target;
        var attacker = "Alexander Iansiti";
        var priv = {};
        var toReturn = {};
        priv[attacker] = {}
        while (Object.keys(toAssign).length !== 0) {
            var keys = Object.keys(toAssign);
            target = keys[keys.length * Math.random() << 0];
            priv[attacker].target = target;
            priv[target] = {};
            priv[attacker].targetEmail = users[target].email;
            var cipher = crypto.createCipher("aes192", users[target].email);
            var cryptacker = cipher.update(attacker, 'utf8', 'latin1');
            cryptacker += cipher.final('latin1')
            priv[target].attacker = cryptacker;
            users[target].tags = 0;
            users[target].violations = 0;
            users[target].alive = 1;
            users[target].taggedAt = 0;
            if (users[target].nick.length === 0) {
                users[target].displayName = target;
            } else {
                users[target].displayName = users[target].nick + " " + target.split(" ")[1];
            }
            console.log(users[target].displayName);
            attacker = target.slice(0);
            delete toAssign[target];
        }
        toReturn.admins = {"Alexander Iansiti": true, "Bryan Price": true, "José Ruiz": true};
        toReturn.classStats = {"Class IV": {"peopleOut":0},"Class III": {"peopleOut":0},"Class II": {"peopleOut":0},"Class I": {"peopleOut":0}}
        toReturn.private = priv;
        toReturn.public = users
        var ref = this.db.ref();
        ref.set(toReturn);
    },
    render: function() {
        return (
            <button onClick={this.confirm}>Reset Database</button>
        );
    }
});

module.exports = ResetDbButton;

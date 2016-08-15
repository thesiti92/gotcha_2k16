var React = require('react');
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var reactfire = require('reactfire');

var UserContent = React.createClass({
    mixins: [reactfire],
    getInitialState: function() {
        var user = firebase.auth().currentUser;
        return {user: {}, name: user.displayName};
    },
    componentWillMount: function() {
        var ref = firebase.database().ref(this.state.name);
        this.bindAsObject(ref, "user");
        this.firebaseRefs.user.on('child_changed', function(snapshot) {
            if (snapshot.val() === 0) {
                alert("you got got bruh");
            }
        });
    },
    gotcha: function(e) {
        e.preventDefault();
        console.log(this.state.user.email);
        this.firebaseRefs.user.update({alive: 0});
    },

    render: function() {
        return (
            <button onClick={this.gotcha}>
                {this.state.user.email}
            </button>
        );
    }
});

module.exports = UserContent;

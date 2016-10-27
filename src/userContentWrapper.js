var React = require('react');
var firebase = require("firebase/app");
require("firebase/database");
var CircularProgress = require('material-ui/CircularProgress').default;
var reactfire = require('reactfire');
var DbButton = require('./resetDb');
var NavBar = require('./NavBar');
var NavDrawer = require('./NavDrawer');
var YesNoAlert = require('./YesNoAlert');
var AdminConsole = require('./AdminConsole');
var Home = require('./Home');
// var Info = require('./Info');
// var Help = require('./Help');
// var Leaderboard = require('./Leaderboard');
const tabs = {
    home: <Home/>,
    info: "info",
    help: 'help',
    leader: "leader"
};

var UserContent = React.createClass({
    mixins: [reactfire],
    getInitialState: function() {
        this.db = firebase.database();

        return {user: {}, tab: "home", open: false};
    },
    changeTab: function(tab) {
        this.setState({tab: tab});
        this.handleToggle();
    },
    handleToggle: function() {
        this.setState({
            open: !this.state.open
        });
    },
    requestChange: function(open, reason) {
        this.setState({open: open});
    },
    componentWillMount: function() {
        var myRef = this.db.ref(this.props.keyName);
        this.bindAsObject(myRef, "user");
        this.firebaseRefs.user.on('child_changed', function(snapshot) {
            if (snapshot.val() === 0) {
                alert("you got got bruh");
            }
        });
    },

    render: function() {
        var content = React.cloneElement(tabs[this.state.tab], {user: this.state.user});
        return (
            <div>
                <NavBar user={this.state.user} handleToggle={this.handleToggle}/>
                <NavDrawer open={this.state.open} tab={this.state.tab} changeTab={this.changeTab} user={this.state.user} onRequestChange={this.requestChange}/> {content}
            </div>
        );
    }
});

module.exports = UserContent;

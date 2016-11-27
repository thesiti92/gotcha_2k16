var React = require('react');
var firebase = require("firebase/app");
require("firebase/database");
var reactfire = require('reactfire');
var NavBar = require('./NavBar');
var NavDrawer = require('./NavDrawer');
var Home = require('./Home');
var About = require('./About');
var Rules = require('./Rules');
var Leaderboard = require('./Leaderboard');
const tabs = {
    home: <Home/>,
    about: <About/>,
    rules: <Rules/>,
    leader: <Leaderboard/>
};

var UserContent = React.createClass({
    mixins: [reactfire],
    getInitialState: function() {
        this.db = firebase.database();
        return {tab: "home", open: false};
    },
    componentWillMount: function() {
        try {
          var myPrivRef = this.db.ref("private").child(this.props.keyName);
          this.bindAsObject(myPrivRef, "privateUser");
          var myPubRef = this.db.ref("public").child(this.props.keyName);
          this.bindAsObject(myPubRef, "publicUser");

        } catch (e) {
           console.error(e)
        }
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
    render: function() {
        var fullUser = Object.assign({},this.state.publicUser, this.state.privateUser);
        var content = React.cloneElement(tabs[this.state.tab], {user: fullUser});
        return (
            <div>
                <NavBar user={fullUser} handleToggle={this.handleToggle}/>
                <NavDrawer open={this.state.open} tab={this.state.tab} changeTab={this.changeTab} user={fullUser} onRequestChange={this.requestChange}/>
                {content}
            </div>
        );
    }
});

module.exports = UserContent;

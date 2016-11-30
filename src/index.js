var ReactDOM = require('react-dom');
var React = require('react');
var UserContent = require('./UserContentWrapper');
var SignIn = require("./SignIn");
var firebase = require("firebase/app");
var CircularProgress = require('material-ui/CircularProgress').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var OkAlert = require('./OkAlert');
var blue5 = require('material-ui/styles/colors').blue500;
var blue6 = require('material-ui/styles/colors').blue600;
var YesNoAlert = require('./YesNoAlert');
var AdminConsole = require('./AdminConsole.js');

var Drawer = require('material-ui/Drawer').default;
require("firebase/auth");
firebase.initializeApp(require("./config"));
var injectTapEventPlugin = require("react-tap-event-plugin");
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue5,
        primary2Color: blue6
    }
});
const middle = {
  top:"50%",
  left:"50%"
};
var blue = require('material-ui/styles/colors').blue900;
injectTapEventPlugin();

var App = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {muiTheme: muiTheme};
    },
    getInitialState: function() {
        return {open: false};
    },
    handleToggle: function() {
        this.setState({
            open: !this.state.open
        });
        console.log(this.state.open);
    },
    requestChange: function(open, reason) {
        this.setState({open: open});
        console.log(reason);
        console.log(this.state.open);
    },
    render: function() {
        var content;
        if (this.props.mode === "signIn") {
            content = <SignIn/>;
        } else if (this.props.mode === "loggedIn") {
            content = <UserContent keyName={this.props.user}/>;
        } else if (this.props.mode === "loading") {
            content = "";
        }
        return (content);
    }
});
firebase.auth().onAuthStateChanged(function(user) {
  try{
    if (user) {
        if (user.email.includes("milton.edu")) {
            // User is signed in.
            ReactDOM.render(
                <App user={user.displayName} mode="loggedIn"/>, document.getElementById('app'));
            firebase.database().ref('admins/' + user.displayName).once('value').then(function() {
                ReactDOM.render(
                    <YesNoAlert prompt="Open Admin Console?" muiTheme={muiTheme} yesAct={function() {
                    ReactDOM.render(
                        <AdminConsole/>, document.getElementById('app'));
                }}/>, document.getElementById('alert'));
            }, function(error){console.log("Not Admin");});
        } else {
            user.delete();
            ReactDOM.render(
                <OkAlert prompt="Please Use An @milton.edu Email Address" muiTheme={muiTheme}/>, document.getElementById('alert'));
        }
    } else {
        // No user is signed in.
        ReactDOM.render(
            <App mode="signIn"/>, document.getElementById('app'));
    }
  }
  catch (e) {
     console.error(e)
  }
});

ReactDOM.render(
    <App mode="loading"/>, document.getElementById('app'));

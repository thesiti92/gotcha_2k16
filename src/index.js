var ReactDOM = require('react-dom');
var React = require('react');

var firebase = require("firebase/app");
require("firebase/auth");
firebase.initializeApp(require("./config"));
var provider = new firebase.auth.GoogleAuthProvider();

var signIn = function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var newUser = result.user;
        console.log(newUser.email);
        if (newUser.email.includes("milton.edu")) {
            loggedIn(newUser);
            return true;
        }

        newUser.delete();
        signIn();
        return false;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log([errorCode, errorMessage, email, credential]);
        signIn();
    });
};

var user = firebase.auth().currentUser;

if (user) {
    console.log("yay");
    loggedIn(user);
} else {
    console.log(user);
    ReactDOM.render(
        <button onClick={signIn}>Sign In</button>, document.getElementById('app'));
}

function loggedIn(user) {
    var data = <div>Hello {user.displayName}</div>;
    ReactDOM.render(data, document.getElementById('app'));
}

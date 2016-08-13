var ReactDOM = require('react-dom');
var React = require('react');
var UserContent = require('./userContentWrapper');

var firebase = require("firebase/app");
require("firebase/auth");
firebase.initializeApp(require("./config"));
var provider = new firebase.auth.GoogleAuthProvider();

var signIn = function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.email.includes("milton.edu")) {
            // User is signed in.
            loggedIn(user);
        } else {
            alert("You Must Have  Milton.edu Email!");
            user.delete();
            signIn();
        }
    } else {
        // No user is signed in.
        ReactDOM.render(
            <button onClick={signIn}>Sign In</button>, document.getElementById('app'));
    }
});
function loggedIn(user) {
    ReactDOM.render(
        <UserContent/>, document.getElementById('app'));
}

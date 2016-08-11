var firebase = require("firebase/app");
 require("firebase/auth");
 require("firebase/database");

 var config = {
     apiKey: "AIzaSyC7KvV36XoQff6eVp16Kem9F-FPWxN_BvM",
     authDomain: "gotcha-2k16.firebaseapp.com",
     databaseURL: "https://gotcha-2k16.firebaseio.com",
     storageBucket: "gotcha-2k16.appspot.com",
   };

module.exports = firebase.initializeApp(config);

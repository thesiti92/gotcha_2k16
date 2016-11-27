var React = require('react');
var firebase = require("firebase/app");
require("firebase/database");
const crypto = require('crypto');


var TagButton = React.createClass({
  getInitialState: function() {
      this.db = firebase.database();
      return {tagName:"", error:"", giveTag:false};
  },

  confirm: function() {
    if (confirm('Switch ' + this.state.switchFromName +" and " + this.state.switchToName + "?")) {
      this.switchPlayers();
    }
  },
  switchPlayers: function(){
    var self = this;
    self.db.ref('private').child(self.state.switchFromName).once('value').then(function(from){

      if (from.val()===null){
        alert(self.state.tagName + " Doesn't exist in the database.");
        return null;
      }
      var fromUser = from.val();
      self.db.ref('public').child(self.state.switchFromName).once('value').then(function(fPub){
      var pubF = fPub.val();
      self.db.ref('private').child(self.state.switchToName).once('value').then(function(to){

        if (to.val()===null){
          alert(self.state.tagName + " Doesn't exist in the database.");
          return null;
        }

        var toUser = to.val();
        self.db.ref('public').child(self.state.switchToName).once('value').then(function(tPub){
        var pubT = tPub.val();
        Object.assign(fromUser, pubF);
        fromUser.name=self.state.switchFromName
        Object.assign(toUser, pubT);
        toUser.name=self.state.switchToName

        console.log(fromUser,toUser);
        self.switch(toUser,fromUser,self);
        self.switch(fromUser,toUser,self);
        });
      });
    });
  });
  },
  switch: function(user1,user2, self){
    //decypher first user's attacker
    var decipher = crypto.createDecipher("aes192", user1.email);
    var a = decipher.update(user1.attacker, "latin1", "utf8");
    a += decipher.final("utf8");
    console.log(a);
    //give attacker new target
    self.db.ref('private').child(a).update({target: user2.name, targetEmail: user2.email});
    self.db.ref('private').child(user1.name).update({target: user2.target, targetEmail: user2.targetEmail});
    //get new encrypted attacker
    var cipher = crypto.createCipher("aes192", user1.targetEmail);
    var newa = cipher.update(user2.name, "utf8", "latin1");
    newa += cipher.final("latin1");
    //give old target new attacker
    self.db.ref('private').child(user1.target).update({attacker: newa});
  },
  onSwitch1: function(event){
    this.setState({switchFromName: event.target.value});
  },
  onSwitch2: function(event){
    this.setState({switchToName: event.target.value});
  },
  render: function() {
    return(
      <div>
        Switch from:
        <input type="text" placeholder="Name of Player to Switch" onChange={this.onSwitch1}/>
        to:
        <input type="text" placeholder="Name of Player to Switch" onChange={this.onSwitch2}/>
        <button onClick={this.confirm}>Switch Players</button>
      </div>
    )
  }
});
module.exports = TagButton;

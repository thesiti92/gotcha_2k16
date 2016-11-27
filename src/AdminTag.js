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
    if (confirm('Remove ' + this.state.tagName+" from the Game?")) {
      this.tag();
    }
  },
  tag: function(){
    var self = this;
    this.db.ref('public').child(this.state.tagName).once("value").then(function(snapshot) {
      if (snapshot===null){
        alert(self.state.tagName + " Doesn't exist in the database.");
        return null;
      }
      console.log(snapshot.val());
      var pubUser = snapshot.val();
        self.db.ref('private').child(self.state.tagName).once('value').then(function(priv){
        var privUser = priv.val();
        var decipher = crypto.createDecipher("aes192", pubUser.email);
        var a = decipher.update(privUser.attacker, "latin1", "utf8");
         a += decipher.final("utf8");
        console.log(a);
        var cipher = crypto.createCipher("aes192", privUser.targetEmail);
        var newa = cipher.update(a, "utf8", "latin1");
        newa += cipher.final("latin1");
        self.db.ref('private').child(privUser.target).update({attacker: newa});
        console.log(a);
        self.db.ref('private').child(a).update({target: privUser.target, targetEmail: privUser.targetEmail});
        if(self.state.giveTag){
          self.db.ref('public').child(a).child("tags").transaction(function(curTags) {
              return curTags + 1;
          });
          self.db.ref('classStats').child(pubUser.class).child("peopleOut").transaction(function(curNum){
            return curNum + 1;
          });
        }
      });
      self.db.ref('public').child(self.state.tagName).update({alive:0});
    });
  },
  onChange: function(event){
    this.setState({tagName: event.target.value});
  },
  onCheck: function(){
    this.setState({giveTag:true});
  },
  render: function() {
    return(
      <div>
        <label><input type="checkbox" onClick={this.onCheck}/>Award Tag to Attacker?</label>
        <input type="text" placeholder="Name of Player to Remove" onChange={this.onChange}/>
        <button onClick={this.confirm}>Remove Player</button>
      </div>
    )
  }
});
module.exports = TagButton;

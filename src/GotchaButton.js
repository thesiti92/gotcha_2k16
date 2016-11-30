var React = require('react');
var firebase = require("firebase/app");
require("firebase/database");
const crypto = require('crypto');
var IconButton = require('material-ui/IconButton').default;
var GotIcon = require('material-ui/svg-icons/action/pan-tool').default;
var Alert = require("./YesNoAlertBasic");
var cyan = require('material-ui/styles/colors').cyan400;
var Paper = require('material-ui/Paper').default;

const styles = {
  mediumIcon: {
    width: '8vmax',
    height: '8vmax',
    maxWidth: 120,
    maxHeight:120,
    color: "white",
    zIndex:6
  },
  medium: {
    width: "15vmax",
    height: "15vmax",
    maxWidth: 200,
    maxHeight:200,
    padding: 24,
    borderRadius: "100%",
    backgroundColor: cyan,
    zIndex:5,
    cursor: 'pointer'
  },
  paper:{
    position: 'fixed',
    bottom: "3%",
    right: "3%",
    zIndex:4,
    cursor: 'pointer'
  }
};


var GotchaButton = React.createClass({
    getInitialState: function() {
        this.db = firebase.database();
        return {open:false};
    },
    gotcha: function() {
        this.setState({open:false})
        var user = this.props.user;
        var decipher = crypto.createDecipher("aes192", user.email);
        var a = decipher.update(user.attacker, "latin1", "utf8");
        a += decipher.final("utf8");
        var cipher = crypto.createCipher("aes192", user.targetEmail);
        var newa = cipher.update(a, "utf8", "latin1");
        newa += cipher.final("latin1");
        this.db.ref('public').child(user['.key']).update({alive: 0, taggedAt: Date.now()});
        this.db.ref('private').child(user.target).update({attacker: newa});
        var pubAttacker = this.db.ref('public').child(a);
        var privAttacker = this.db.ref('private').child(a);
        privAttacker.update({target: user.target, targetEmail:user.targetEmail});
        pubAttacker.child("tags").transaction(function(curTags) {
            return curTags + 1;
        });
        this.db.ref('classStats').child(user.class).child("peopleOut").transaction(function(curNum){
          return curNum + 1;
        });
    },
    confirm1: function(e) {
      e.preventDefault();
      this.setState({open:true, prompt: "Do you confirm you are out of Gotcha?", func: this.confirm2});
    },
    confirm2: function(){
      this.setState({open:false})
      setTimeout(function () {
        this.setState({open:true, prompt: "Are you sure that YOU have been tagged and are out?" , func: this.gotcha});
      }.bind(this), 100);
    },
    close: function(){
      this.setState({open:false});
    },
    render: function() {
        return (
          <div>
          <Paper style={styles.paper} circle={true} zDepth={5}>
            <IconButton style={styles.medium} iconStyle={styles.mediumIcon} onTouchTap={this.confirm1}>
                <GotIcon/>
            </IconButton>
            </Paper>
            <Alert open={this.state.open} yes={this.state.func} close={this.close} prompt={this.state.prompt}/>
            </div>
        );
    }
});
module.exports = GotchaButton;

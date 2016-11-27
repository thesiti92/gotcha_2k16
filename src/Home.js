var React = require('react');
var GotchaButton = require('./GotchaButton');
var Paper = require("material-ui/Paper").default;
var CircularProgress = require('material-ui/CircularProgress').default;

var Home = React.createClass({
  getDefaultProps: function() {
      return {
          targetStyle: {
            fontSize: "6vw",
            position: "relative",
            bottom: "30px"
          },
          tagStyle:{
            fontSize: "6vw",
            position: "relative",
          },
          paperStyle: {
              height: '38%',
              width: '80%',
              margin: 'auto',
              position: 'fixed',
              top: '25%',
              left: '10%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }
      };
    },
    tagString: function() {
      if(this.props.user.tags === undefined){
        return "You Have Tags";
      }
      var numtags = this.props.user['tags'];
      if(numtags===0){
        return "You Have No Tags Yet";
      }
      else if (numtags===1){
        return "You Have 1 Tag";
      }
      else{
        var tags = numtags+"";
        return ("You Have " + tags + " Tags");
      }
    },
    render: function() {
      var tagsTxt = this.tagString()
      if(this.props.user.alive===undefined){
        return (
          <Paper style={this.props.paperStyle} zDepth={5}>
            <CircularProgress/>
          </Paper>);
      }
      else if(this.props.user.alive===1){
        return (<div>
          <GotchaButton user={this.props.user}/>
          <Paper style={this.props.paperStyle} zDepth={5}>
          <div>
            <h2 style={this.props.targetStyle}>Your Target is <br/>{this.props.user.target}</h2>
            <h2 style={this.props.tagStyle}>{tagsTxt}</h2>
          </div>
          </Paper>
        </div>);
      }
      else if(this.props.user.alive===0){
        return (
          <Paper style={this.props.paperStyle} zDepth={5}>
            <h2 style={{fontSize:'6vw'}}>Hope You Had Fun Playing!</h2>
          </Paper>
        );
      }
    }
});
module.exports = Home;

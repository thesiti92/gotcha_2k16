var React = require('react');
var Paper = require("material-ui/Paper").default;
var CircularProgress = require('material-ui/CircularProgress').default;
var firebase = require("firebase/app");
require("firebase/database");
var reactfire = require('reactfire');

var PercentOut = React.createClass({
  mixins: [reactfire],
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '50px',
              width: '70%',
              margin: 'auto',
              position: 'absolute',
              top: '100px',
              left: '15%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 'large'
          }
      };
    },
    getInitialState: function(){
      return({stats:[]});
    },
    componentWillMount: function(){
      var statRef = firebase.database().ref('classStats');
      this.bindAsArray(statRef, "stats");
    },
    render: function() {
      var stats = this.state.stats;
      var content;
      if(stats.length <2){
        content=<CircularProgress/>
      }
      else{
        var studentsOut = 0;
        stats.forEach(function(cur){
          studentsOut += cur.peopleOut;
        });
        var percent = studentsOut/715*100;
        content = Math.round(percent) + "% of Milton Academy is Out";
      }
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        {content}
      </Paper>
      );
    }
});
module.exports = PercentOut;

var React = require('react');
var TagLeaderboard = require('./TagLeaderboard');
var DeadLeaderboard = require('./DeadLeaderboard');
var PercentageOut = require('./PercentageOut');
var DeadGraph = require('./DeadGraph');
var FindUser = require('./FindUser');

var Leaderboard = React.createClass({
  getDefaultProps: function(){
    return{
      divStyle: {
        margin: 'auto',
        position: 'fixed',
        top: '0%',
        width:"100%",
        height:"100%",
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflowY: "scroll",
        alignItems: 'center'
      }
    };

  },
    render: function() {
      return(
        <div style={this.props.divStyle}>
        <PercentageOut/>
        <FindUser/>
          <TagLeaderboard/>
          <DeadLeaderboard/>
          <DeadGraph/>
          </div>
      )
    }
});
module.exports = Leaderboard;

var React = require('react');
var Paper = require("material-ui/Paper").default;
var CircularProgress = require('material-ui/CircularProgress').default;
var firebase = require("firebase/app");
require("firebase/database");
var reactfire = require('reactfire');
var Plotly = require('react-plotlyjs');

var DeadGraph = React.createClass({
  mixins: [reactfire],
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '400px',
              width: '80%',
              margin: 'auto',
              position: 'absolute',
              top: '1100px',
              left: '10%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 'large',
              marginBottom: '30px'
          },
          graphColors: [
            "rgb(21,101,192)",
            "rgb(0,172,193)",
            "rgb(94,53,177)",
            "rgb(216,27,96)"
          ]
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
        var x = []
        var labels = []
        var text=[]
        stats.forEach(function(grade){
          x.push(grade.peopleOut);
          labels.push(grade['.key']);
        });
        var data = [{
            values: x,
            text: labels,
            hoverinfo: 'percent+value',
            marker: {
              colors: this.props.graphColors
            },
            type: 'pie'
            }];
        var layout = {
          width:400,
          height:400,
          title: 'Students Out by Class',
          showlegend: false,
          font: {
            family: 'Roboto, monospace',
            size: 18,
            color: '#000000'
          }
         };
        content = <Plotly data={data} layout={layout} config={{showLink: false, displayModeBar: false}}/>;
      }
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        {content}
      </Paper>
      );
    }
});
module.exports = DeadGraph;

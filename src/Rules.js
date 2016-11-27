var React = require('react');
var Paper = require("material-ui/Paper").default;

var Rules = React.createClass({
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '330px',
              width: '86%',
              margin: 'auto',
              position: 'absolute',
              top: '250px',
              left: '7%',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight:'200%',
          }
      };
    },

    render: function() {
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        <h3 style={{position:'absolute', top:0}}>Gotcha 2016 Rules:</h3>
        //Rules
      </Paper>
      );
    }
});
module.exports = Rules;

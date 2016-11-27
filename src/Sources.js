var React = require('react');
var Paper = require("material-ui/Paper").default;

var Sources = React.createClass({
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
        <h3 style={{position:'absolute', top:0}}>... And These Handy Tools</h3>
        React: A Modular, Flexible UI Framework From Facebook
        <br/>
        Material-UI: A Set of React Components Using Google&#39;s Material Design Spec
        <br/>
        Firebase: A Realtime Database and Authentication API from Google
        <br/>
        ReactFire: A React Mixin with Firebase Bindings
        <br/>
        Plotly.js: A Lightweight Grapher in Javascript, not Flash @ats
        <br/>
        Node.js: A Javascript Runtime Environment that Makes it All Happen
        <br/>
        Browserify: A Javascript Packager that Lets Me Write Pretty Code
      </Paper>
      );
    }
});
module.exports = Sources;

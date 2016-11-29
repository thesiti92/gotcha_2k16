var React = require('react');
var Paper = require("material-ui/Paper").default;

var Sources = React.createClass({
  getDefaultProps: function() {
      return {
          paperStyle: {
              width: '85%',
              margin: 'auto',
              position: 'relative',
              top: '3em',
              textAlign: 'left',
              display: 'flex',
              lineHeight:'200%',
              fontSize: '1.8vmax'
          }
      };
    },

    render: function() {
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        <h3 style={{position:'absolute', margin:0, width:'100%', textAlign:'center'}}>... And These Handy Tools</h3>
        <div style={{position:'relative', marginLeft:5, marginTop:'2em', marginBottom:'1em'}}>
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
        </div>
      </Paper>
      );
    }
});
module.exports = Sources;

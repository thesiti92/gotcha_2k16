var React = require('react');
var Paper = require("material-ui/Paper").default;
var Heart = require('material-ui/svg-icons/action/favorite').default;
var Code = require('material-ui/svg-icons/action/code').default;

var ByAlex = React.createClass({
  getDefaultProps: function() {
      return {
          paperStyle: {
              width: '70%',
              margin: 'auto',
              position: 'relative',
              top: '.2em',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '5vw'
          },
          iconStyle: {
            height:'2em',
            width:'2em',
            top:'.5em',
            position: 'relative',
            marginRight: 7.5,
            marginLeft:7.5
          }
      };
    },

    render: function() {
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        <div style={{position:"relative", bottom:10}}>
          <Code preserveAspectRatio='xMidYMid meet' style={Object.assign({},this.props.iconStyle, {color: 'rgb(96,125,139)'})}/>
          With
          <Heart preserveAspectRatio='xMidYMid meet' style={Object.assign({},this.props.iconStyle, {color: 'rgb(245,124,0)'})}/>
          by
          Alex Iansiti
        </div>
      </Paper>
      );
    }
});
module.exports = ByAlex;

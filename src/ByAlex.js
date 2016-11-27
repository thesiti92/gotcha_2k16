var React = require('react');
var Paper = require("material-ui/Paper").default;
var Heart = require('material-ui/svg-icons/action/favorite').default;
var Code = require('material-ui/svg-icons/action/code').default;

var ByAlex = React.createClass({
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '75px',
              width: '70%',
              margin: 'auto',
              position: 'absolute',
              top: '100px',
              left: '15%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          },
          iconStyle: {
            height:60,
            width:60,
            top:15,
            position: 'relative',
            marginRight: 7.5,
            marginLeft:7.5
          }
      };
    },

    render: function() {
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        <div style={{fontSize: "5vw", position:"relative", bottom:10}}>
          <Code style={Object.assign({},this.props.iconStyle, {color: 'rgb(96,125,139)'})}/>
          With
          <Heart style={Object.assign({},this.props.iconStyle, {color: 'rgb(245,124,0)'})}/>
          by
          Alex Iansiti
        </div>
      </Paper>
      );
    }
});
module.exports = ByAlex;

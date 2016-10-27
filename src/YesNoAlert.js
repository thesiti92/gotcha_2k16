var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var React = require('react');

var OkAlert = React.createClass({
    getInitialState: function() {
        return ({open: true});
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {muiTheme: this.props.muiTheme};
    },
    yes: function() {
      this.props.yesAct();
      this.close();
    },
    close: function() {
        this.setState({open: false});
    },
    render: function() {
        const actions = [<FlatButton label="Yes" primary={true} onTouchTap={this.yes}/>,
      <FlatButton label="No" primary={true} onTouchTap={this.close}/>];
        return (
            <Dialog actions={actions} open={this.state.open} onRequestClose={this.close}>
                {this.props.prompt}
            </Dialog>
        );
    }
});
module.exports = OkAlert;

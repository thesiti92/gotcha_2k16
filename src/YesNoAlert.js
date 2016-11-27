var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var React = require('react');
var lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').defualt;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var YesNoAlert = require('./YesNoAlert');


var YesNoAlert = React.createClass({
    getInitialState: function() {
        return ({open: true});
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext() {
        return {muiTheme: getMuiTheme(lightBaseTheme)};
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
module.exports = YesNoAlert;

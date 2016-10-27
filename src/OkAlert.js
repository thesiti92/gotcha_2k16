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
    close: function() {
        this.setState({open: false});
    },
    render: function() {
        const action = <FlatButton label="OK" primary={true} onTouchTap={this.close}/>;
        return (
            <Dialog actions={action} open={this.state.open} onRequestClose={this.props.closePrompt}>
                {this.props.prompt}
            </Dialog>
        );
    }
});
module.exports = OkAlert;

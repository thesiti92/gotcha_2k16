var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var React = require('react');


var YesNoAlert = React.createClass({
    render: function() {
        const actions = [<FlatButton label="Yes" primary={true} onTouchTap={this.props.yes}/>,
      <FlatButton label="No" primary={true} onTouchTap={this.props.close}/>];
        return (
            <Dialog actions={actions} open={this.props.open} onRequestClose={this.props.close}>
                {this.props.prompt}
            </Dialog>
        );
    }
});
module.exports = YesNoAlert;

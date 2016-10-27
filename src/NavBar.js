var React = require('react');
var AppBar = require('material-ui/AppBar').default;
const float = {
    float: "right"
};

var NavBar = React.createClass({
    render: function() {
        var title = <div>
            <span>
                Milton Academy Gotcha
            </span>
            <span style={float}>
                {this.props.user.displayName}
            </span>
        </div>;
        return (
                <AppBar title={title} onLeftIconButtonTouchTap={this.props.handleToggle}/>
        );
    }
});

module.exports = NavBar;

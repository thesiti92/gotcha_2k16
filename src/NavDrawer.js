var React = require('react');
var Drawer = require('material-ui/Drawer').default;
var MenuItem = require('material-ui/MenuItem').default;
var LeaderIcon = require('material-ui/svg-icons/action/trending-up').default;
var AboutIcon = require('material-ui/svg-icons/action/info').default;
var HelpIcon = require('material-ui/svg-icons/action/help').default;
var HomeIcon = require('material-ui/svg-icons/action/home').default;
var Divider = require('material-ui/Divider').default;
var clone = require('clone');

const itemStyle = {
    fontSize: "large",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "transparent"
};
const spacer = {
    height: 25
};
const divider = {
    height: 2
};

var NavDrawer = React.createClass({
    render: function() {
        var focused = {};
        focused[this.props.tab] = {
            backgroundColor: "rgb(189,189,189)"
        };
        var cTab = this.props.changeTab;
        return (
            <Drawer docked={false} width={250} open={this.props.open} onRequestChange={this.props.onRequestChange} swipeAreaWidth={200}>
                <div style={spacer}/>
                <Divider style={divider}/>
                <MenuItem primaryText="Home" id="home" style={Object.assign(clone(itemStyle), focused.home)} leftIcon={< HomeIcon />} onTouchTap={cTab.bind(null, "home")}/>
                <Divider style={divider}/>
                <MenuItem primaryText="Leaderboard" style={Object.assign(clone(itemStyle), focused.leader)} leftIcon={< LeaderIcon />} onTouchTap={cTab.bind(null, "leader")}/>
                <Divider style={divider}/>
                <MenuItem primaryText="Rules" style={Object.assign(clone(itemStyle), focused.rules)} leftIcon={< HelpIcon />} onTouchTap={cTab.bind(null, "rules")}/>
                <Divider style={divider}/>
                <MenuItem primaryText="About" style={Object.assign(clone(itemStyle), focused.about)} leftIcon={< AboutIcon />} onTouchTap={cTab.bind(null, "about")}/>
                <Divider style={divider}/>
            </Drawer>
        );
    }
});
module.exports = NavDrawer;

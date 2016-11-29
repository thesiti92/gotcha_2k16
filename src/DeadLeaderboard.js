var React = require('react');
var Paper = require("material-ui/Paper").default;
var CircularProgress = require('material-ui/CircularProgress').default;
var TableItems = require('material-ui/Table');
var Table = TableItems.Table;
var TableBody = TableItems.TableBody;
var TableHeader = TableItems.TableHeader;
var TableHeaderColumn = TableItems.TableHeaderColumn;
var TableRow = TableItems.TableRow;
var TableRowColumn = TableItems.TableRowColumn;
var firebase = require("firebase/app");
require("firebase/database");
var reactfire = require('reactfire');
const weekdays = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"]


var DeadLeaderboard = React.createClass({
  mixins: [reactfire],
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '400px',
              width: '80%',
              margin: 'auto',
              position: 'absolute',
              top: '750px',
              left: '10%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
          }
      };
    },
    getInitialState: function(){
      this.db = firebase.database();
      return({peopleDead:[]});
    },
    componentWillMount: function(){
      var deadRef = this.db.ref('public').orderByChild('taggedAt').limitToLast(20);
      this.bindAsArray(deadRef, "peopleDead");
    },
    render: function() {
      var peopleDead = this.state.peopleDead.slice().reverse();

      var content = (<Table selectable={false} height="350px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Tagged On</TableHeaderColumn>
              <TableHeaderColumn>Tagged At</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {peopleDead.map(function(person,index){
            if(person.taggedAt===0){
              return
            }
            var d = new Date(0);
            d.setUTCMilliseconds(person.taggedAt);
                      return(
                       <TableRow key={index}>
                         <TableRowColumn>{person.displayName}</TableRowColumn>
                         <TableRowColumn>{weekdays[d.getDay()]}</TableRowColumn>
                         <TableRowColumn>{d.toLocaleTimeString('en-US',{timeZone:'America/New_York', hour:'numeric', minute: 'numeric'})}</TableRowColumn>
                       </TableRow>)}
                       )}
          </TableBody>
        </Table>);
      if(peopleDead.length <2){
        content = <CircularProgress/>;
      }
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
          {content}
        </Paper>
      );
    }
});
module.exports = DeadLeaderboard;

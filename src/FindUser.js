var React = require('react');
var Paper = require("material-ui/Paper").default;
var firebase = require("firebase/app");
var Popover = require('material-ui/Popover').default;
var ReactDOM = require('react-dom');
var TableItems = require('material-ui/Table');
var Table = TableItems.Table;
var TableBody = TableItems.TableBody;
var TableHeader = TableItems.TableHeader;
var TableHeaderColumn = TableItems.TableHeaderColumn;
var TableRow = TableItems.TableRow;
var TableRowColumn = TableItems.TableRowColumn;
require("firebase/database");
var AutoComplete = require('material-ui/AutoComplete').default;
const users = Object.keys(require('/mnt/c/Users/aians/Documents/gotcha_2k16/data_management/gotcha.json'));
const weekdays = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"]
var FindUser = React.createClass({
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '60px',
              width: '70%',
              margin: 'auto',
              position: 'absolute',
              top: '200px',
              left: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 'large',
              paddingLeft: 15,
              paddingRight: 15
          }
      };
    },
    getInitialState: function(){
      return({open:false, errorText: "", person:{}});
    },
    componentDidMount: function(){
      this.AutoComplete = ReactDOM.findDOMNode(this);
    },
    onEnter: function(input){
      this.setState({errorText:""});
      var self = this;
      firebase.database().ref('public').child(input).once('value').then(function(snapshot){
        if(snapshot.val()===null){
          self.setState({errorText: "This User Doesn't Exist!"});
        }
        var person = snapshot.val()
        var deadTime = "Not Out"
        var deadDay = "Not Out"
        if(person.taggedAt!=0){
          var d = new Date(0);
          d.setUTCMilliseconds(person.taggedAt);
          deadTime = d.toLocaleTimeString('en-US',{timeZone:'America/New_York',hour:'numeric', minute: 'numeric'});
          deadDay = weekdays[d.getDay()];
        }
        person.taggedAt = deadTime;
        person.deadDay = deadDay
        var alive = 'Yes';
        if(person.alive===0){
          alive = 'No'
        }
        person.alive=alive;
        self.setState({open:true, person:person})
      });
    },
    onClose: function(){
      this.setState({open:false});
    },
    render: function() {
      var result = this.state.person;
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        <AutoComplete dataSource={users} hintText="Find a player" errorText={this.state.errorText} maxSearchResults={5} fullWidth={true} onNewRequest={this.onEnter} filter={AutoComplete.caseInsensitiveFilter}/>
        <Popover style={{width:'70%'}} open={this.state.open} onRequestClose={this.onClose} anchorEl={this.AutoComplete}>
        <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Tags</TableHeaderColumn>
            <TableHeaderColumn>Alive</TableHeaderColumn>
            <TableHeaderColumn>Tagged On</TableHeaderColumn>
            <TableHeaderColumn>Tagged At</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
           <TableRow key={0}>
             <TableRowColumn>{result.tags}</TableRowColumn>
             <TableRowColumn>{result.alive}</TableRowColumn>
             <TableRowColumn>{result.deadDay}</TableRowColumn>
             <TableRowColumn style={{paddingRight:20}}>{result.taggedAt}</TableRowColumn>
           </TableRow>
        </TableBody>
        </Table>
        </Popover>
      </Paper>
      );
    }
});
module.exports = FindUser;

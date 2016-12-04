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

var TagLeaderboard = React.createClass({
  mixins: [reactfire],
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '400px',
              width: '80%',
              margin: 'auto',
              position: 'absolute',
              top: '300px',
              left: '10%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }
      };
    },
    getInitialState: function(){
      this.db = firebase.database();
      return({peopleTags:[]});
    },
    componentWillMount: function(){
      var tagsRef = this.db.ref('public').orderByChild('tags').limitToLast(20);
      this.bindAsArray(tagsRef, "peopleTags");
    },
    render: function() {
      var peopleTags = this.state.peopleTags.slice().reverse();
      var content = (<Table selectable={false} height="350px">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
            <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Tags</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {peopleTags.map(function(person,index){
                      if(person.tags===0){
                        return
                      }
                      return(
                       <TableRow key={index}>
                        <TableRowColumn>{index+1}</TableRowColumn>
                         <TableRowColumn style={{whiteSpace:'wrap', wordWrap: "break-word", paddingLeft: 15, paddingRight: 15}}>{person.displayName}</TableRowColumn>
                         <TableRowColumn>{person.tags}</TableRowColumn>
                       </TableRow>)}
                       )}
          </TableBody>
        </Table>);
      if(peopleTags.length <2){
        content = <CircularProgress/>
      }
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        {content}
      </Paper>
      );
    }
});
module.exports = TagLeaderboard;

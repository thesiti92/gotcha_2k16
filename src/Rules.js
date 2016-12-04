var React = require('react');
var Paper = require("material-ui/Paper").default;
var Divider = require('material-ui/Divider').default;

var Rules = React.createClass({
  getDefaultProps: function() {
      return {
          paperStyle: {
              height: '70vmax',
              width: '86%',
              margin: 'auto',
              position: 'relative',
              top: '2em',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight:'200%',
              maxHeight: 600
          },
          textWrapper: {
            overflowY: "scroll",
            height:'90%',
            top:'5%',
            position:'relative',
            marginLeft: 5
          }
      };
    },

    render: function() {
      return (
        <Paper style={this.props.paperStyle} zDepth={5}>
        <h3 style={{position:'absolute', top:0}}>Gotcha 2016 Rules:</h3>
        <div style={this.props.textWrapper}>
        Monday: Gotcha will start at 10&#58;00am, and will end at 5&#58;30pm
        <br/>
        Tuesday-Friday: Gotcha will start at 8&#58;25am and will end at 5&#58;30pm
        <Divider/>
        If people are in sports practice, play practice, or play auditions, you cannot tag them.
        Also, be aware that the library only has one door that students are allowed to use (the other doors have alarms).
        <Divider/>
        No tagging in:
        <ul style={{marginTop:0}}>
        <li>Pritzker</li>
        <li>The admissions hall</li>
        <li>Classrooms</li>
        <li>Dining halls</li>
        <li>Dorms</li>
        <li>Cox Library</li>
        <li>The quad between Ware and library</li>
        <li>The weight room</li>
        <li>On or around school buses</li>
        <li>On Centre street or the sidewalks next to Centre street. (Seriously, please be careful around Centre St. We don&#39;t want people to get hurt)</li>
        </ul>
        <Divider/>
        PLEASE, do not physically harm or tackle people, and PLEASE do not blockade areas in any way.
        <br/>
        A good rule of thumb: if it stops people from doing work or maintaining personal wellness, don&#39;t do it.
        <br/>
        If a student is caught breaking a rule, they will be disqualified.
        <Divider/>
        The winner of gotcha is the person who has the most tags of those still alive by Friday, 5&#58;30pm.
        <br/>
        The winner will receive a custom gotcha shirt.
      </div>
      </Paper>
      );
    }
});
module.exports = Rules;

var React = require('react');
var ByAlex = require('./ByAlex');
var Sources = require('./Sources')

var About = React.createClass({
    render: function() {
      return (
        <div>
          <ByAlex/>
          <Sources/>
        </div>
      );
    }
});
module.exports = About;

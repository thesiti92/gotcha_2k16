var React = require('react');
var ResetDb = require('./resetDb');
var AdminTag = require('./AdminTag');
var AdminSwitch = require('./AdminSwitch');


var AdminConsole = React.createClass({

    render: function() {
        return (
          <div>
            <AdminTag/>
            <ResetDb/>
            <AdminSwitch/>
          </div>
        );
    }
});

module.exports = AdminConsole;

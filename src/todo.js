var React = require('react')
var reactfire = require('reactfire')
var firebase = require('./firebase')

var TodoList = React.createClass({
	render: function() {
		return <ol > {
			this.props.items.map(
				function(item){
					return <li key={item.id}>{item.text}</li>
				})
		} < /ol>
	}
});
var TodoApp = React.createClass({
  mixins: [reactfire],

  componentWillMount: function() {
  var ref = firebase.database().ref("items");
  this.bindAsArray(ref, "items");
  },
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
		this.firebaseRefs['items'].push({
	    text: this.state.text
	  });
	  this.setState({ text: "" });
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

module.exports = TodoApp

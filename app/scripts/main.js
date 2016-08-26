var InnerComponent = React.createClass({
  render: function() {
    return (
      <h3>{this.props.value.foo}</h3>
    );
  }
});


var OuterBox = React.createClass({
  getInitialState: function() {
    return { value: { foo: 'bar' } };
  },

  onClick: function() {
    var value = this.state.value;
    value.foo += 'bar'; // ANTI-PATTERN!
    this.setState({ value: value });
  },

  render: function() {
    return (
      <div>
        <InnerComponent value={this.state.value} />
        <a onClick={this.onClick}>Click me</a>
      </div>
    );
  }
});


ReactDOM.render(
  <OuterBox />,
  document.getElementById('container')
);

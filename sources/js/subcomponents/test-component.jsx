import React, {Component} from "react";

export class TestComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="TestCmp">
        <p>Que que que que pasa ♪♫</p>
        <p>{this.props.a_test_prop}</p>
      </div>
    );
  }
}
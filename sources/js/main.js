import ReactDOM from 'react-dom';
import React from "react";
import {TestComponent} from "./subcomponents/test-component";

ReactDOM.render(
  <TestComponent a_test_prop={"String passed as a property"}/>,
  document.getElementById('app-root')
);
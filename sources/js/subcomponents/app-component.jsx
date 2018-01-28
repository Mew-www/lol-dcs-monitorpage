import React, {Component} from "react";
import {MonitorComponent} from "./monitor-component";

export class AppComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <section className="App__monitor">
          <MonitorComponent/>
        </section>
      </div>
    );
  }
}
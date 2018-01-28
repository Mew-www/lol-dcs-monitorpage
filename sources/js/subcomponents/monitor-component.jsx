import React, {Component} from "react";
import Settings from "../settings";
import axios from "axios";
import {GatheredMatchesComponent} from "./gathered-matches-component";

export class MonitorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gathered_data: null
    };
  }
  componentDidMount() {
    axios.get(Settings.MONITOR_GATHERING_DATA_SUMMARY_URI)
      .then((response) => {
        this.setState({gathered_data: response.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
      <div className="Monitor">
        {!this.state.gathered_data ?
          ""
          :
          <GatheredMatchesComponent
            gathered_matches={this.state.gathered_data['matches']}
          />
        }
      </div>
    );
  }
}
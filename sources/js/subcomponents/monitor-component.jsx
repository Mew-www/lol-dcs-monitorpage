import React, {Component} from "react";
import Settings from "../settings";
import axios from "axios";
import {GatheredMatchesComponent} from "./gathered-matches-component";
import {GatherersActivityComponent} from "./gatherers-activity-component";
import {RatelimitGraphsComponent} from "./ratelimit-graphs-component";

export class MonitorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gathered_data: null,
      gatherers_activity: null,
      ratelimit_endpoints: null
    };
  }
  componentDidMount() {
    axios.get(Settings.MONITOR_GATHERING_DATA_SUMMARY_URI)
      .then((response) => {
        this.setState({gathered_data: response.data})
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(Settings.MONITOR_GATHERING_ACTIVITY_URI)
      .then((response) => {
        this.setState({gatherers_activity: response.data})
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(Settings.MONITOR_RATELIMIT_ENDPOINTS_URI)
      .then((response) => {
        this.setState({ratelimit_endpoints: response.data})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="Monitor">
        {!this.state.gathered_data ?
          ""
          :
          <div className="Monitor__gathered-matches">
            <GatheredMatchesComponent
              gathered_matches={this.state.gathered_data['matches']}
            />
          </div>
        }
        {!this.state.gatherers_activity ?
          ""
          :
          <div className="Monitor__gatherers-activity">
            <GatherersActivityComponent
              gatherers_activity={this.state.gatherers_activity}
            />
          </div>
        }
        {!this.state.ratelimit_endpoints ?
          ""
          :
          <div className="Monitor__ratelimit-graphs">
            <RatelimitGraphsComponent
              ratelimit_endpoints={this.state.ratelimit_endpoints}
            />
          </div>
        }
      </div>
    );
  }
}
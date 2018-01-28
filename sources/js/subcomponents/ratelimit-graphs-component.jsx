import React, {Component} from "react";
import Settings from "../settings";

export class RatelimitGraphsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint_hashes: this.props.ratelimit_endpoints
    };
  }
  render() {
    return (
      <div className="RatelimitGraphs">
        {Object.keys(this.state.endpoint_hashes).map((description_key) =>
          <img className="RatelimitGraphs__graph"
               src={Settings.MONITOR_RATELIMIT_PNG_URI(this.state.endpoint_hashes[description_key])}
               title={description_key}/>
        )}
      </div>
    );
  }
}
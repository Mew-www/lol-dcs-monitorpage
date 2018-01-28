import React, {Component} from "react";
import Settings from "../settings";
import axios from "axios";

export class MonitorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gathered_matches: null
    };
  }
  componentDidMount() {
    axios.get(Settings.MONITOR_GATHERING_DATA_SUMMARY_URI)
      .then((response) => {
        this.setState({gathered_matches: response.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    function sort_tiers(a,b) {
      if (a === 'total') {return -1}
      if (b === 'total') {return 1}
      function tier_to_num(tiername) {
        switch(tiername.toUpperCase()) {
          case 'CHALLENGER':
            return 0;
          case 'MASTER':
            return 1;
          case 'DIAMOND':
            return 2;
          case 'PLATINUM':
            return 3;
          case 'GOLD':
            return 4;
          case 'SILVER':
            return 5;
          case 'BRONZE':
            return 6;
          default:
            return 7;
        }
      }
      return tier_to_num(a) - tier_to_num(b);
    }
    return (
      <div className="Monitor">
        {!this.state.gathered_matches ?
          ""
          :
          <div className="Monitor__gathered-data">
            <div className="Monitor__gathered-data-title">
              Match data gathered ({this.state.gathered_matches['matches_total']} amongst all regions)
            </div>
            {Object.keys(this.state.gathered_matches['matches_per_region']).map((region) =>
              <div className="Monitor__gathered-data-region">
                <table className="Monitor__gathered-data-table">
                  <caption className="Monitor__gathered-data-table-caption">{region}</caption>
                  {Object.keys(this.state.gathered_matches['matches_per_region'][region]).sort(sort_tiers).map((tier) =>
                    <tr className="Monitor__gathered-data-table-row">
                      <td className="Monitor__gathered-data-table-cell">{tier}:</td>
                      <td className="Monitor__gathered-data-table-cell">{this.state.gathered_matches['matches_per_region'][region][tier]}</td>
                    </tr>
                  )}
                </table>
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}
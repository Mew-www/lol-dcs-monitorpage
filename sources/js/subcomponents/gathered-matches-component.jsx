import React, {Component} from "react";

export class GatheredMatchesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: this.props.gathered_matches
    };
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
    let spanned_semvers_per_region = Object.keys(this.state.matches['per_region'])
      .reduce((region_accumulator, region) => {
        region_accumulator[region] = Object.keys(this.state.matches['per_region'][region])
          .filter(tier => tier!=='total')
          .reduce((accumulator, tier) => {
            for (let semver of this.state.matches['per_region'][region][tier]) {
              if (accumulator.indexOf(semver['game_version__semver']) === -1) {
                accumulator.push(semver['game_version__semver']);
              }
            }
            return accumulator;
          }, [])
          .sort();
        return region_accumulator;
      }, {});
    return (
      <div className="GatheredMatches">
        <div className="GatheredMatches-title">
          Match data gathered ({this.state.matches['total']} amongst all regions)
        </div>
        {Object.keys(this.state.matches['per_region']).map((region) =>
          <div className="GatheredMatches-region" key={region}>
            <table className="GatheredMatches-table">
              <caption className="GatheredMatches-table-caption">{region}</caption>
              <thead>
                <tr>
                  <th> </th>
                  {spanned_semvers_per_region[region].map((semver) =>
                    <th key={semver}>{semver}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.matches['per_region'][region]).sort(sort_tiers).map((tier) =>
                  <tr className="GatheredMatches-table-row" key={region+tier}>
                    <td className="GatheredMatches-table-cell">{tier}:</td>
                      {spanned_semvers_per_region[region].map((semver) =>
                        <td className="GatheredMatches-table-cell" key={region+tier+semver}>{
                          this.state.matches['per_region'][region][tier].find((semver_record) => {
                            return semver_record['game_version__semver'] === semver;
                          }) ?
                            this.state.matches['per_region'][region][tier].find((semver_record) => {
                              return semver_record['game_version__semver'] === semver;
                            })['total']
                            :
                            "0"
                        }</td>
                      )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
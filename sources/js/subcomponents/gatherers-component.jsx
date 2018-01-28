import React, {Component} from "react";

export class GatherersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.gatherers_activity
    };
  }
  render() {
    function activity_ago(epochs_by_identifier, identifier) {
      let then = new Date(parseInt(epochs_by_identifier[identifier])*1000);
      let now = new Date();
      let milliseconds_delta = now - then;
      let full_seconds = Math.floor(milliseconds_delta / 1000);
      if (full_seconds < 60) {
        return full_seconds === 1 ? `${full_seconds} second ago` : `${full_seconds} seconds ago`;
      } else if (full_seconds < 60*60) {
        let full_minutes = Math.floor(full_seconds / 60);
        return full_minutes === 1 ? `${full_minutes} minute ago` : `${full_minutes} minutes ago`;
      } else if (full_seconds < 60*60*24) {
        let full_hours = Math.floor(full_seconds / 60 / 60);
        return full_hours === 1 ? `${full_hours} hour ago` : `${full_hours} hours ago`;
      } else {
        let full_days = Math.floor(full_seconds / 60 / 60 / 24);
        return full_days === 1 ? `${full_days} day ago` : `${full_days} days ago`;
      }
    }
    let inactive_num = Object.keys(this.state.activity)
      .reduce((acc, gatherer_id) => {
        // "Over 21 minutes (theoretical maximum) idle" -> 60*21 seconds = 1260*1000 milliseconds = 1260000
        return new Date() > new Date(parseInt(this.state.activity[gatherer_id])*1000 + 1260000) ? acc+1 : acc;
      }, 0);
    return (
      <div className="Gatherers">
        <div className="Gatherers__title">
          Gatherers' RiotAPI activity
          {inactive_num ?
            <span>&nbsp;&nbsp;&nbsp;<span className="Gatherers__inactive">{inactive_num} inactive</span></span>
            :
            ""}
        </div>
        <table className="Gatherers__activity-table">
          {Object.keys(this.state.activity).sort((a,b) => a-b).map((gatherer_identifier) =>
            <tr className="Gatherers__gatherer">
              <td className="Gatherers__gatherer-id">{gatherer_identifier}</td>
              <td className="Gatherers__gatherer-activity">
                <span className={
                  "Gatherers__gatherer-activity-txt"
                  +
                  (activity_ago(this.state.activity, gatherer_identifier).indexOf('second') !== -1 ?
                      " Gatherers__gatherer-activity-txt--operative"
                      :
                      activity_ago(this.state.activity, gatherer_identifier).indexOf('minutes') !== -1
                      && 21 > parseInt(activity_ago(this.state.activity, gatherer_identifier).split(' ')[0]) > 6 ?
                        " Gatherers__gatherer-activity-txt--uncertain"
                        :
                        " Gatherers__gatherer-activity-txt--inactive"
                  )
                }>{activity_ago(this.state.activity, gatherer_identifier)}</span>
              </td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}
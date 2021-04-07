import React from "react";
import fs from "fs";

// TODO: manual lag deviation
class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // keepTop: true,
      // iconSize: 30,
      // hideEvent: false,
      // brightness: 0.5,
      ...props.data,
    };
    this.hdlChange = this.hdlChange.bind(this);
    this.saveSetting = this.saveSetting.bind(this);
  }
  hdlChange(e, field) {
    var val;
    switch (field) {
      case "keepTop":
        val = !this.state.keepTop;
        break;
      case "hideEvent":
        val = !this.state.hideEvent;
        break;
      default:
        val = e.target.value;
    }
    this.setState({ [field]: val });
  }
  saveSetting() {
    // careful about async with deep-copy issue
    this.props.deploySetting(this.state);
    fs.writeFile(window.INIT_FILE_PATH, JSON.stringify(this.state), (err) => {
      if (err) return console.log(err);
    });
    this.props.viewSwitch(0);
  }
  // componentDidMount() {}
  render() {
    return (
      <div id="setup" className="view">
        <div id="setup-title">Setup</div>
        <input
          type="checkbox"
          checked={this.state.keepTop}
          onChange={(e) => this.hdlChange(e, "keepTop")}
        />
        <label>Keep window on top</label>
        <br />
        <label>Icon size: </label>
        <input
          className="setup-input-number"
          type="number"
          value={this.state.iconSize}
          disabled
          onChange={(e) => this.hdlChange(e, "iconSize")}
        />
        px
        <br />
        <input
          type="checkbox"
          checked={this.state.hideEvent}
          disabled
          onChange={(e) => this.hdlChange(e, "hideEvent")}
        />
        <label>Hide inactive event</label>
        <br />
        <label>Brightness of retired event: </label>
        <input
          className="setup-input-number"
          type="number"
          value={this.state.brightness}
          min="0"
          max="1"
          disabled
          onChange={(e) => this.hdlChange(e, "brightness")}
        />
        (0-1)
        <button id="setup-backButton" onClick={() => this.props.viewSwitch(0)}>
          Back
        </button>
        <button id="setup-saveButton" onClick={this.saveSetting}>
          Save
        </button>
      </div>
    );
  }
}

export default Setup;

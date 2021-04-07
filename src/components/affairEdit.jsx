import React from "react";

import Svg from "./svg";
// TODO: preset
class AffairEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // name,
      // color,
      // icon,
      // trigger,
      // duration,
      // cooldown,
      // voice,
      // enableLoop,
      // enableVoice,
      // reverseLogic,
      ...props.data,
    };
    this.hdlChange = this.hdlChange.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }
  hdlChange(e, field) {
    var val;
    switch (field) {
      case "icon":
        this.setState({
          icon: document
            .getElementById("affairEdit-iconFile")
            .files[0].path.replaceAll("\\", "/"),
        });
        return;
      case "enableLoop":
        val = !this.state.enableLoop;
        break;
      case "enableVoice":
        val = !this.state.enableVoice;
        break;
      case "expireRadio":
        this.setState({ reverseLogic: false });
        return;
      case "voiceFile":
        this.setState({
          voice: document
            .getElementById("affairEdit-voice")
            .files[0].path.replaceAll("\\", "/"),
        });
        return;
      default:
        val = e.target.value;
    }
    this.setState({ [field]: val });
  }
  finishEdit(save) {
    if (save) {
      if (
        this.state.enableLoop &&
        Number(this.state.cooldown) <= Number(this.state.duration)
      ) {
        alert("Error: Cooldown must be greater than Duration!");
        return;
      }
      var affair = Object.assign(this.state);
      this.props.updateAffair(this.props.index, affair);
    }
    this.props.toggleEdit(-3);
  }
  // componentDidMount() {}
  render() {
    return (
      <div id="affairEdit">
        <input
          id="affairEdit-iconFile"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => this.hdlChange(e, "icon")}
        />
        <div className="affairEdit-col">
          <div
            id="affairEdit-icon"
            style={{
              backgroundColor: this.state.color,
              backgroundImage: `url('${this.state.icon}')`,
            }}
            onClick={() =>
              document.getElementById("affairEdit-iconFile").click()
            }
          >
            <Svg name="edit" stroke="black" fill="white" />
          </div>
          <div>
            Key:&nbsp;
            <input
              id="affairEdit-key"
              type="text"
              value={this.state.trigger}
              onChange={(e) => this.hdlChange(e, "trigger")}
            />
          </div>
          <div id="affairEdit-key-eg">(e.g. Q, 1, LMB, RMB)</div>
        </div>
        <div className="affairEdit-col">
          <label>
            Name:
            <br />
            <input
              id="affairEdit-name"
              type="text"
              value={this.state.name}
              onChange={(e) => this.hdlChange(e, "name")}
            />
          </label>
          <label>
            Duration:
            <div>
              <input
                id="affairEdit-duration"
                type="number"
                min="1000"
                value={this.state.duration}
                onChange={(e) => this.hdlChange(e, "duration")}
              />
              ms
            </div>
          </label>
          <label>
            Cooldown:
            {/* disable when not loop */}
            <div>
              <input
                id="affairEdit-cooldown"
                type="number"
                min="1000"
                value={this.state.cooldown}
                onChange={(e) => this.hdlChange(e, "cooldown")}
                disabled={!this.state.enableLoop}
              />
              ms
            </div>
          </label>
        </div>
        <div className="affairEdit-col">
          <label>
            <input
              type="checkbox"
              checked={this.state.enableLoop}
              onChange={(e) => this.hdlChange(e, "enableLoop")}
            />
            Enable Loop
          </label>
          <br />
          <br />
          <label>
            Highlight on:
            <br />
            <input
              type="radio"
              checked={!this.state.reverseLogic}
              onChange={(e) => this.hdlChange(e, "expireRadio")}
            />
            Expire
            <input
              type="radio"
              checked={this.state.reverseLogic}
              onChange={(e) => this.hdlChange(e, "reverseLogic")}
            />
            Active
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={this.state.enableVoice}
              onChange={(e) => this.hdlChange(e, "enableVoice")}
            />
            Enable Voice:
            <br />
            <input
              type="text"
              disabled={!this.state.enableVoice}
              value={this.state.voice}
              onChange={(e) => this.hdlChange(e, "voice")}
            />
            <input
              id="affairEdit-voice"
              type="file"
              disabled={!this.state.enableVoice}
              onChange={(e) => this.hdlChange(e, "voiceFile")}
            />
          </label>
        </div>
        <div className="affairEdit-col">
          <label>
            Color:
            <input
              type="color"
              value={this.state.color}
              onChange={(e) => this.hdlChange(e, "color")}
            />
          </label>
          {/* Preset:
          <select id="affairEdit-preset">
            <option value="元素嘉年华">元素嘉年华</option>
          </select> */}
        </div>
        <div className="affairEdit-col">
          <button onClick={() => this.finishEdit(true)}>Confirm</button>
          <br />
          <button onClick={() => this.finishEdit(false)}>Cancel</button>
          <br />
          {!this.props.new && (
            <button onClick={() => this.props.deleteAffair(this.props.index)}>
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default AffairEdit;

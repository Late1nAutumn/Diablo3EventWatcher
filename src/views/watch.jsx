import React from "react";
import fs from "fs";

import AffairEntry from "../components/affairEntry";
import AffairEdit from "../components/affairEdit";

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: -3, // -3: not editing, -2: select edit object, -1: adding new
      affairs: [],
      triggeredAffair: -1,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.resetTriggerState = this.resetTriggerState.bind(this);
    this.saveAffair = this.saveAffair.bind(this);
    this.sortAffairs = this.sortAffairs.bind(this);
    this.updateAffair = this.updateAffair.bind(this);
    this.deleteAffair = this.deleteAffair.bind(this);
  }
  toggleEdit(editing) {
    this.setState({ editing });
  }
  resetTriggerState() {
    // console.log((new Date() - window.emitTiming) / 1000);
    // delete window.emitTiming;
    this.setState({ triggeredAffair: -1 });
  }
  saveAffair(affairs) {
    this.setState({ affairs }, () =>
      fs.writeFile(window.SAVE_FILE_PATH, JSON.stringify(affairs), (err) => {
        if (err) return console.log(err);
      })
    );
  }
  sortAffairs(index, move) {
    if (index + move < 0 || index + move >= this.state.affairs.length) return;
    var affairs = this.state.affairs.slice();
    var temp = affairs[index + move];
    affairs[index + move] = affairs[index];
    affairs[index] = temp;

    // This is a lame way, but the only solution I found to solve the not rerendering issue
    this.setState({ affairs: [] }, () => this.saveAffair(affairs));
  }
  updateAffair(i, affair) {
    var affairs = this.state.affairs.slice();
    affairs[i] = affair;
    this.saveAffair(affairs);
  }
  deleteAffair(i) {
    var affairs = this.state.affairs.slice();
    affairs.splice(i, 1);
    this.saveAffair(affairs);
    this.toggleEdit(-3);
  }
  createAffair() {
    return {
      name: "",
      color: "#fffafa",
      icon: "", // url
      trigger: "",
      duration: 1000, // ms, timeout
      cooldown: 1000, // ms, interval
      voice: "", // url
      enableLoop: false,
      enableVoice: false,
      reverseLogic: false, // highlight on expire by default
    };
  }
  componentDidMount() {
    fs.readFile(window.SAVE_FILE_PATH, "utf-8", (err, data) => {
      if (!err) this.setState({ affairs: JSON.parse(data) });
    });

    window.emiter = (device, key, event) => {
      // TODO: handle special charactor, ctrl, shift, alt, win, option, esc, f1, f2...
      // console.log(event + ' ' + key);
      // window.emitTiming = new Date(); // for speed anylize
      if (this.state.editing !== -3) return;
      var signal = "";
      if (device === "m" && key === "1") signal = "LMB";
      else if (device === "m" && key === "2") signal = "RMB";
      else if (device === "k" && key.length === 1) signal = key;
      this.state.affairs.forEach(({ trigger }, triggeredAffair) => {
        if (trigger && trigger.toLowerCase() === signal.toLowerCase()) {
          console.log("triggered " + signal);
          this.setState({ triggeredAffair });
        }
      });
    };
  }
  componentWillUnmount() {
    window.emiter = () => {};
  }
  render() {
    switch (this.state.editing) {
      case -3: // display normally
        return (
          <div id="watch" className="view">
            {this.state.affairs.map((affair, i) => (
              <AffairEntry
                data={affair}
                editing={false}
                triggered={this.state.triggeredAffair === i}
                resetTrigger={this.resetTriggerState}
                key={i}
              />
            ))}
            <div id="watch-buttons">
              <button onClick={() => this.toggleEdit(-2)}>Edit</button>
              <br />
              <button onClick={() => this.props.viewSwitch(0)}>Quit</button>
            </div>
          </div>
        );
      case -2: // select affair to be edit
        return (
          <div id="watch" className="view">
            {this.state.affairs.map((affair, i) => (
              <AffairEntry
                data={affair}
                editing={true}
                toggleEdit={this.toggleEdit}
                sortAffairs={this.sortAffairs}
                index={i}
                key={i}
              />
            ))}
            <div id="watch-buttons">
              <button onClick={() => this.toggleEdit(-3)}>Done</button>
              <br />
              <button onClick={() => this.toggleEdit(-1)}>New</button>
            </div>
          </div>
        );
      default:
        return (
          <AffairEdit
            data={
              this.state.editing === -1
                ? this.createAffair()
                : this.state.affairs[this.state.editing]
            }
            toggleEdit={this.toggleEdit}
            updateAffair={this.updateAffair}
            deleteAffair={this.deleteAffair}
            index={
              this.state.editing === -1
                ? this.state.affairs.length
                : this.state.editing
            }
            new={this.state.editing === -1}
          />
        );
    }
  }
}

export default Watch;

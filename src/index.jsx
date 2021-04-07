import React from "react";
import ReactDOM from "react-dom";
import { ipcRenderer } from "electron";
import fs from "fs";

import Watch from "./views/watch";
import Setup from "./views/setup";
import Intro from "./views/intro";

window.INIT_FILE_PATH = "./system.ini";
window.SAVE_FILE_PATH = "./save.txt";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
    };
    this.setting = null;

    this.deploySetting = this.deploySetting.bind(this);
    this.viewSwitch = this.viewSwitch.bind(this);
  }
  deploySetting(obj) {
    this.setting = Object.assign(obj);
    ipcRenderer.send(obj.keepTop ? "lockTop" : "unlockTop");
  }
  viewSwitch(view) {
    const viewID = ["Index", "Watch", "Setup", "Intro"];
    this.setState({ view });
    ipcRenderer.send("load" + viewID[view]);
  }
  initSettings() {
    var setting = {
      keepTop: true,
      iconSize: 30,
      hideEvent: false,
      brightness: 0.5,
    };
    fs.writeFile(window.INIT_FILE_PATH, JSON.stringify(setting), (err) => {
      if (err) return console.log(err);
      // console.log("system setting file init");
    });
  }
  componentDidMount() {
    console.log(process.env);
    // TODO: Loading settings seems buggy
    fs.readFile(window.INIT_FILE_PATH, "utf-8", (err, data) => {
      if (err) this.initSettings();
      else this.deploySetting(JSON.parse(data));
    });
  }
  render() {
    switch (this.state.view) {
      case 0:
        return (
          <div id="index" className="view">
            <div id="index-title">D3 EVENT WATCHER</div>
            <button id="index-watch" onClick={() => this.viewSwitch(1)}>
              WATCH
            </button>
            <button id="index-setup" onClick={() => this.viewSwitch(2)}>
              SETUP
            </button>
            <button id="index-intro" onClick={() => this.viewSwitch(3)}>
              INTRO
            </button>
          </div>
        );
      case 1:
        return <Watch viewSwitch={this.viewSwitch} />;
      case 2:
        return (
          <Setup
            data={this.setting}
            deploySetting={this.deploySetting}
            viewSwitch={this.viewSwitch}
          />
        );
      case 3:
        return <Intro viewSwitch={this.viewSwitch} />;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

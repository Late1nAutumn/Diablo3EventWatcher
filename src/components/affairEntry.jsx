import React from "react";

import Svg from "./svg";

class Affair extends React.Component {
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
      highlight: this.props.data.reverseLogic,
      countdown: 0,
    };

    this.loopInterval = null;
    this.loopTimeout = null;
    this.prepareLoopCountdownTimeout = null;
    this.countdownInterval = null;
    this.triggerDurationTimeout = null;
    this.prepareTriggerCountdownTimeout = null;

    this.audio = null;

    this.highlighting = this.highlighting.bind(this);
    this.iconClick = this.iconClick.bind(this);
    this.CharAboveIcon = this.CharAboveIcon.bind(this);
  }
  reverseColor(color) {
    var reverse = (hex) =>
      ("0" + (255 - parseInt(hex, 16)).toString(16)).slice(-2);
    var r = color.slice(1, 3),
      g = color.slice(3, 5),
      b = color.slice(5, 7);
    return "#" + reverse(r) + reverse(g) + reverse(b);
  }
  highlighting(b) {
    var highlight = this.state.reverseLogic ? !b : b;
    if (this.state.enableVoice) if (highlight) this.audio.play();
    this.setState({ highlight });
  }
  iconClick() {
    if (this.props.editing) this.props.toggleEdit(this.props.index);
    else if (this.state.enableLoop) {
      // TODO: add animation
      if (this.loopInterval !== null) {
        clearInterval(this.loopInterval);
        clearTimeout(this.loopTimeout);
        clearTimeout(this.prepareLoopCountdownTimeout);
        clearInterval(this.countdownInterval);
        this.loopInterval = null;
        this.loopTimeout = null;
        this.prepareLoopCountdownTimeout = null;
        this.countdownInterval = null;
        this.setState({ countdown: 0 });
        return;
      }

      const { duration, cooldown } = this.state;
      clearInterval(this.loopInterval);
      clearTimeout(this.loopTimeout);
      clearTimeout(this.prepareLoopCountdownTimeout);
      clearInterval(this.countdownInterval);

      var loop = () => {
        this.highlighting(false);
        this.loopTimeout = setTimeout(() => {
          this.highlighting(true);

          this.prepareLoopCountdownTimeout = setTimeout(() => {
            this.setState({
              countdown: Math.floor((cooldown - duration) / 1000),
            });
            this.countdownInterval = setInterval(() => {
              if (!this.state.countdown) clearInterval(this.countdownInterval);
              else this.setState({ countdown: this.state.countdown - 1 });
            }, 1000);
          }, cooldown - duration - Math.floor((cooldown - duration) / 1000) * 1000);
        }, duration);
      };
      loop();
      this.loopInterval = setInterval(loop, cooldown);
    }
  }
  componentDidMount() {
    this.audio = document.getElementById(
      "affairEntry-audio-" + this.props.index
    );
  }
  componentWillUnmount() {
    clearInterval(this.loopInterval);
    clearTimeout(this.loopTimeout);
    clearTimeout(this.prepareLoopCountdownTimeout);
    clearInterval(this.countdownInterval);
    clearTimeout(this.triggerDurationTimeout);
    clearTimeout(this.prepareTriggerCountdownTimeout);
  }
  shouldComponentUpdate({ triggered }) {
    if (triggered && !this.props.triggered) {
      const { duration } = this.state;
      clearTimeout(this.triggerDurationTimeout);
      clearInterval(this.countdownInterval);
      clearTimeout(this.prepareTriggerCountdownTimeout);

      this.highlighting(false);
      this.triggerDurationTimeout = setTimeout(() => {
        this.highlighting(true);
      }, duration);

      if (duration % 1000)
        this.setState({ countdown: Math.ceil(duration / 1000) });
      this.prepareTriggerCountdownTimeout = setTimeout(() => {
        this.setState({ countdown: Math.floor(duration / 1000) });
        this.countdownInterval = setInterval(() => {
          if (!this.state.countdown) clearInterval(this.countdownInterval);
          else this.setState({ countdown: this.state.countdown - 1 });
        }, 1000);
      }, duration - Math.floor(duration / 1000) * 1000);

      this.props.resetTrigger();
      return false;
    } else return true;
  }
  CharAboveIcon() {
    if (this.props.editing) return this.state.trigger;
    if (this.state.highlight && !this.state.loop) return this.state.trigger;
    if (this.state.loop && !this.state.highlight)
      return this.state.countdown ? this.state.countdown : "";
    return this.state.countdown > 0 ? this.state.countdown : "";
  }
  render() {
    // TODO: editing hover event
    return (
      <div className="affairEntry">
        <audio id={"affairEntry-audio-" + this.props.index}>
          <source src={this.state.voice} />
        </audio>
        <div onClick={this.iconClick}>
          <div
            className="affairEntry-icon"
            style={{
              backgroundColor: this.state.color,
              backgroundImage: `url('${this.state.icon}')`,
              opacity: this.state.highlight ? "1" : "0.3",
            }}
          >
            {this.props.editing && (
              <Svg
                name="edit"
                stroke={this.reverseColor(this.state.color)}
                fill={this.reverseColor(this.state.color)}
              />
            )}
            <div
              className="affairEntry-charOnIcon"
              style={{ color: this.reverseColor(this.state.color) }}
            >
              {this.CharAboveIcon()}
            </div>
          </div>
          <div>{`${this.state.name}(${this.state.trigger})`}</div>
        </div>
        {this.props.editing && (
          <div>
            <button
              onClick={() => this.props.sortAffairs(this.props.index, -1)}
            >
              &#60;
            </button>
            <button onClick={() => this.props.sortAffairs(this.props.index, 1)}>
              &#62;
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Affair;

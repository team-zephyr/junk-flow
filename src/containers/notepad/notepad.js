// @flow
import React, { Component } from "react";
import asProgram, { ProgramProps } from "../program";

class Notepad extends Component<ProgramProps> {
  static Props = ProgramProps;
  componentDidMount() {
    this.props.openProgram(1, "", { allowMultipleInstances: false });
  }
  render() {
    return <div>Im the Notepad</div>;
  }
}

export default asProgram({ allowMultipleInstances: false })(Notepad);

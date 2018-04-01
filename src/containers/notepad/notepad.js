import React, { Component } from "react";
import asProgram from "../program";

class Notepad extends Component {
  render() {
    return <div>Hello World</div>;
  }
}

export default asProgram({ allowMultipleInstances: false })(Notepad);

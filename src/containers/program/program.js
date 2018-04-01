import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import * as Ducks from "./ducks";

function asProgram(config) {
  return WrappedComponent => {
    class Program extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    const mapDispatchToProps = dispatch => ({
      closeProgramByWindowId: id => dispatch(Ducks.closeProgramByWindowId(id)),
      closeProgramByProgramId: id =>
        dispatch(Ducks.closeProgramsByProgramId(id)),
      openProgram: id =>
        dispatch(Ducks.openProgram(id, uuid(), config.allowMultipleInstances))
    });

    return connect(null, mapDispatchToProps)(Program);
  };
}

export default asProgram;

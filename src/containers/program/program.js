// @flow
import * as React from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import * as Ducks from "./ducks";

export interface ProgramProps {
  closeProgramByProgramId: Function;
  closeProgramByWindowId: Function;
  openProgram: Function;
}

function asProgram(config: Ducks.Config) {
  return function injectProp<Props: {}>(
    Component: React.ComponentType<Props>
  ): React.ComponentType<Props & ProgramProps> {
    class WrapperComponent extends React.Component<Props> {
      render() {
        return <Component {...this.props} />;
      }
    }

    const mapDispatchToProps = dispatch => ({
      closeProgramByWindowId: id => dispatch(Ducks.closeProgramByWindowId(id)),
      closeProgramByProgramId: id =>
        dispatch(Ducks.closeProgramsByProgramId(id)),
      openProgram: id => dispatch(Ducks.openProgram(id, uuid(), config))
    });

    return connect(null, mapDispatchToProps)(WrapperComponent);
  };
}

export default asProgram;

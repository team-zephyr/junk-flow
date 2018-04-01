// @flow
export const OPEN_PROGRAM = "junk/program/OPEN_PROGRAM";
export const CLOSE_PROGRAM = "junk/program/CLOSE_PROGRAM";
export const SHOW_PROGRAM = "junk/program/SHOW_PROGRAM";
export const CLOSE_PROGRAM_BY_WINDOW_ID =
  "junk/program/CLOSE_PROGRAM_BY_WINDOW_ID";
export const CLOSE_PROGRAMS_BY_PROGRAM_ID =
  "junk/program/CLOSE_PROGRAMS_BY_PROGRAM_ID";

export const initialState = {
  openPrograms: [],
  isLoaded: false
};

interface Program {
  windowId: string;
  programId: number;
}

interface ProgramsState {
  openPrograms: Array<Program>;
  isLoaded: boolean;
}

interface actionPayload extends Program {
  type: string;
}

export interface Config {
  allowMultipleInstances: boolean;
}

export function reducer(
  state: ProgramsState = initialState,
  action: actionPayload
) {
  switch (action.type) {
    case OPEN_PROGRAM: {
      const { windowId, programId } = action;
      return {
        ...state,
        openPrograms: [...state.openPrograms, { windowId, programId }]
      };
    }
    case CLOSE_PROGRAMS_BY_PROGRAM_ID: {
      return {
        ...state,
        openPrograms: state.openPrograms.filter(
          program => program.programId !== action.programId
        )
      };
    }
    case CLOSE_PROGRAM_BY_WINDOW_ID: {
      return {
        ...state,
        openPrograms: state.openPrograms.filter(
          program => program.windowId !== action.windowId
        )
      };
    }
    default:
      return state;
  }
}

export function closeProgramByWindowId(windowId: string) {
  return {
    type: CLOSE_PROGRAM_BY_WINDOW_ID,
    windowId
  };
}

export function closeProgramsByProgramId(programId: number) {
  return {
    type: CLOSE_PROGRAMS_BY_PROGRAM_ID,
    programId
  };
}

export function programOpened(windowId: string, programId: number) {
  return {
    type: OPEN_PROGRAM,
    programId,
    windowId
  };
}

export function showProgram(windowId: string) {
  return {
    type: SHOW_PROGRAM,
    windowId
  };
}

export function openProgram(
  programId: number,
  windowId: string,
  config: Config
) {
  return (dispatch: Function, getState: Function) => {
    if (!config.allowMultipleInstances) {
      const foundProgram = getState().program.openPrograms.find(
        program => program.programId === programId
      );

      if (foundProgram) {
        dispatch(showProgram(windowId));
      } else {
        dispatch(programOpened(windowId, programId));
        dispatch(showProgram(windowId));
      }
    } else {
      dispatch(programOpened(windowId, programId));
      dispatch(showProgram(windowId));
    }
  };
}

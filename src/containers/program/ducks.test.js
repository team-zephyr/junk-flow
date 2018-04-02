import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Ducks from './ducks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const program = {
  windowId: 'test',
  programId: 1,
};

describe('Action creators ', () => {
  it('should create an action to open program', () => {
    const expectedAction = {
      type: Ducks.OPEN_PROGRAM,
      windowId: program.windowId,
      programId: program.programId,
    };

    expect(Ducks.programOpened(program.windowId, program.programId)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to close program', () => {
    const expectedAction = {
      type: Ducks.CLOSE_PROGRAM_BY_WINDOW_ID,
      windowId: program.windowId,
    };

    expect(Ducks.closeProgramByWindowId(program.windowId)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to close programs by program id', () => {
    const expectedAction = {
      type: Ducks.CLOSE_PROGRAMS_BY_PROGRAM_ID,
      programId: program.programId,
    };

    expect(Ducks.closeProgramsByProgramId(program.programId)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to show program by window id', () => {
    const expectedAction = {
      type: Ducks.SHOW_PROGRAM,
      windowId: program.windowId,
    };

    expect(Ducks.showProgram(program.windowId)).toEqual(expectedAction);
  });
});

describe('thunk call correctly calls actions', () => {
  it('open program calls actions', () => {
    const config: Ducks.Config = {
      allowMultipleInstances: true,
    };

    const expectedActions = [
      {
        type: Ducks.OPEN_PROGRAM,
        windowId: program.windowId,
        programId: program.programId,
      },
      { type: Ducks.SHOW_PROGRAM, windowId: program.windowId },
    ];

    const store = mockStore({ program: Ducks.initialState });

    store.dispatch(
      Ducks.openProgram(program.programId, program.windowId, config),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('open program where program is already open with no multiple instances doesnt open new instance', () => {
    const config: Ducks.Config = {
      allowMultipleInstances: false,
    };

    const expectedActions = [
      { type: Ducks.SHOW_PROGRAM, windowId: program.windowId },
    ];

    const store = mockStore({
      program: {
        ...Ducks.initialState,
        openPrograms: [...Ducks.initialState.openPrograms, program],
      },
    });

    store.dispatch(
      Ducks.openProgram(program.programId, program.windowId, config),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('open program where program is already open with multiple instances opens a new instance', () => {
    const config: Ducks.Config = {
      allowMultipleInstances: true,
    };

    const expectedActions = [
      {
        type: Ducks.OPEN_PROGRAM,
        windowId: program.windowId,
        programId: program.programId,
      },
      { type: Ducks.SHOW_PROGRAM, windowId: program.windowId },
    ];

    const store = mockStore({
      program: {
        ...Ducks.initialState,
        openPrograms: [...Ducks.initialState.openPrograms, program],
      },
    });

    store.dispatch(
      Ducks.openProgram(program.programId, program.windowId, config),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('open program where program is not already open with multiple instances not allowed will not open new instance', () => {
    const config: Ducks.Config = {
      allowMultipleInstances: false,
    };

    const expectedActions = [
      {
        type: Ducks.OPEN_PROGRAM,
        windowId: program.windowId,
        programId: program.programId,
      },
      { type: Ducks.SHOW_PROGRAM, windowId: program.windowId },
    ];

    const store = mockStore({
      program: {
        ...Ducks.initialState,
        openPrograms: [...Ducks.initialState.openPrograms],
      },
    });

    store.dispatch(
      Ducks.openProgram(program.programId, program.windowId, config),
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Program reducer ', () => {
  it('should return the initial state', () => {
    expect(Ducks.reducer(undefined, {})).toEqual(Ducks.initialState);
  });

  it('should handle OPEN_PROGRAM', () => {
    expect(
      Ducks.reducer(Ducks.initialState, {
        ...program,
        type: Ducks.OPEN_PROGRAM,
      }),
    ).toEqual({
      ...Ducks.initialState,
      openPrograms: [{ ...program }],
    });
  });

  it('should handle CLOSE_PROGRAM_BY_WINDOW_ID', () => {
    const programs = [{ ...program }, { ...program, windowId: 'otherTest' }];

    expect(
      Ducks.reducer(
        { ...Ducks.initialState, openPrograms: programs },
        { windowId: program.windowId, type: Ducks.CLOSE_PROGRAM_BY_WINDOW_ID },
      ),
    ).toEqual({
      ...Ducks.initialState,
      openPrograms: [{ ...program, windowId: 'otherTest' }],
    });
  });

  it('should handle CLOSE_PROGRAMS_BY_PROGRAM_ID', () => {
    const programs = [{ ...program }, { ...program, windowId: 'otherTest' }];

    expect(
      Ducks.reducer(
        { ...Ducks.initialState, openPrograms: programs },
        {
          programId: program.programId,
          type: Ducks.CLOSE_PROGRAMS_BY_PROGRAM_ID,
        },
      ),
    ).toEqual({
      ...Ducks.initialState,
    });
  });
});

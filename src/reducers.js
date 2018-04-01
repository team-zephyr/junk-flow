import { combineReducers } from "redux";

import { reducer as program } from "./containers/program";

const rootReducer = combineReducers({
  program
});

export default rootReducer;

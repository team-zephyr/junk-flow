import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { initialState as program } from "./containers/program";

const defaultState = {
  program
};

const enhancers = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const configureStore = () => {
  const store = createStore(rootReducer, defaultState, enhancers);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

const store = configureStore();
export default store;

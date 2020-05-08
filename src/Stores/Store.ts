import { createStore } from "redux";
import { gameReducer } from "Reducers/Reducers";

/**
 * Игровой стор.
 */
const gameStore = createStore(
  gameReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { gameStore };

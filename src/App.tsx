import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { gameStore } from "Stores/Store";
import Board from "./Components/Game/Board/Board";

function App() {
  return (
    <Provider store={gameStore}>
      <Board dataTestId="board"/>
    </Provider>
  );
}

export default App;

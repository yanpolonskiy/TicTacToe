import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { gameStore } from "Stores/Store";
import Game from "Components/Game/Game";

function App() {
  return (
    <Provider store={gameStore}>
      <Game dataTestId="game" />
    </Provider>
  );
}

export default App;

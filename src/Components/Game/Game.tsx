import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IGameState, TBoardState } from "Reducers/Reducers";
import React from "react";
import { GameActions } from "Actions/Actions";
import { EValue } from "Consts/GameConsts";
import { IGameActions, TCoordinates } from "Consts/ActionTypes";
import { Header } from "./Header/Header";
import { Board } from "./Board/Board";
import "./Game.css";

/**
 * Интерфейс пропсов игры.
 *
 * @prop {TBoardState} board Состояние игрового поля.
 * @prop {GameActions} gameActions Игровые действия.
 * @prop {EValue} turn Текущий ход.
 * @prop {boolean} hasWinner Обнаружен ли в игре победитель.
 * @prop {string} dataTestId ДТИ для тестов.
 */
interface IProps {
  board: TBoardState;
  gameActions: GameActions;
  turn: EValue;
  hasWinner: boolean;
  dataTestId: string;
}

/**
 * Ссостояние стейта.
 * @prop {number} isGameInProcess Признак, что игра в процессе.
 */
interface IState {
  isGameInProcess: boolean;
}

class Game extends React.Component<IProps, IState> {
  state: IState = {
    isGameInProcess: false,
  };

  componentDidUpdate(
    prevProps: Readonly<IProps>
  ): void {
    /**
     * Если победитель обнаружен, то игра закончилась.
     */
    if (this.props.hasWinner && !prevProps.hasWinner) {
      this.setState({
        isGameInProcess: false,
      });
    }
  }

  /**
   * Начало игры
   */
  startGame = () => {
    this.props.gameActions.makeMove({ cell: [0, 0] });
    this.setState({
      isGameInProcess: true,
    });
  };

  /**
   * Метод выполнения хода
   * @param {TCoordinates} coordinates Координаты клетки, в которую сделан ход.
   */
  makeMove = (coordinates: TCoordinates) => {
    const { hasWinner, gameActions } = this.props;
    if (hasWinner || !this.state.isGameInProcess) return;
    gameActions.makeMove({ cell: coordinates });
  };

  render() {
    const { turn, hasWinner, dataTestId, board } = this.props;
    return (
      <div className="game" data-testid={dataTestId}>
        <Header turn={turn} onStart={this.startGame} hasWinner={hasWinner} />
        <Board board={board} onMakeMove={this.makeMove} turn={turn} />
      </div>
    );
  }
}

const mapStateToProps = (state: IGameState) => {
  const { board, turn, hasWinner } = state;
  return {
    board,
    turn,
    hasWinner,
  };
};

const mapActionsToProps = (dispatch: Dispatch) => {
  return {
    gameActions: bindActionCreators<IGameActions, any>(
      new GameActions(),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Game);

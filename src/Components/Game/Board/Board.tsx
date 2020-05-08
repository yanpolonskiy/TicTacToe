import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IGameState, TBoardState} from 'Reducers/Reducers';
import React, {RefObject} from 'react';
import './Board.css';
import {CellHeight, CellWidth} from 'Consts/ConfigConsts';
import {Cell} from 'Components/Game/Cell/Cell';
import {GameActions} from 'Actions/Actions';
import {EValue} from 'Consts/GameConsts';
import {IGameActions, TCoordinates} from 'Consts/ActionTypes';
import {Button} from 'Components/Common/Button/Button';
import {debounce} from 'Utils/Utils';

/**
 * Константа для расчета дополнительно отрисовываемых клеток при скролле к границе поля.
 */
const OUT_OF_BOUNDARIES_CELLS_COUNT = 5;

/**
 * Интерфейс пропсов игрового поля.
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
 * Ссостояние стейта игрового поля.
 * @prop {number} xCount Количество клеток по координате Х.
 * @prop {number} yCount Количество клеток по координате Y.
 * @prop {number} isGameInProcess Признак, что игра в процессе.
 */
interface IState {
  xCount: number;
  yCount: number;
  isGameInProcess: boolean;
}

class Board extends React.Component<IProps, IState> {
  state: IState = {
    xCount: Math.floor(
      window.innerWidth / CellWidth + OUT_OF_BOUNDARIES_CELLS_COUNT
    ),
    yCount: Math.floor(
      window.innerHeight / CellHeight + OUT_OF_BOUNDARIES_CELLS_COUNT
    ),
    isGameInProcess: false
  };

  /**
   * Реф на игровое поле.
   */
  tableRef: RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.subscribeListeners();
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    /**
     * Если победитель обнаружен, то игра закончилась.
     */
    if (this.props.hasWinner && !prevProps.hasWinner) {
      this.setState({
        isGameInProcess: false
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribeListeners()
  }

  /**
   * Подписка на изменение размеров окна, подписка на скролл, для отрисовки дополнительных клеток.
   */
  subscribeListeners = () => {
    window.addEventListener("resize", this.updateBoardOnResize);
    this.tableRef.current!.addEventListener(
        "scroll",
        this.addExtraCellsOnScroll
    );
  };

  /**
   * Отписка подписчиков при анмаунте.
   */
  unsubscribeListeners = () => {
    window.removeEventListener("resize", this.updateBoardOnResize);
    this.tableRef.current!.removeEventListener(
        "scroll",
        this.addExtraCellsOnScroll
    );
  };

  /**
   * Пересчет количества клеток при ресайзе в большую сторону.
   */
  updateBoardOnResize = () => {
    const newXCount = Math.floor(
      window.innerWidth / CellWidth + OUT_OF_BOUNDARIES_CELLS_COUNT
    );
    const newYCount = Math.floor(
      window.innerHeight / CellHeight + OUT_OF_BOUNDARIES_CELLS_COUNT
    );
    if (newXCount > this.state.xCount) {
      this.setState({
        xCount: newXCount,
      });
    }
    if (newYCount > this.state.yCount) {
      this.setState({
        yCount: newYCount,
      });
    }
  };

  /**
   * Отрисовка дополнительных клеток при скролле к границе.
   * @return {Function} Функция вызываемая с задержкой
   * @param {React.UIEvent<HTMLDivElement>} e Событие скролла
   */
  addExtraCellsOnScroll = debounce((e: React.UIEvent<HTMLElement>) => {
    if ((e.target as Element).scrollHeight - (e.target as Element).clientHeight - (e.target as Element).scrollTop < OUT_OF_BOUNDARIES_CELLS_COUNT) {
      this.setState((prevState) => ({yCount: prevState.yCount + 5}));
    }

    if ((e.target as Element).scrollWidth - (e.target as Element).clientWidth - (e.target as Element).scrollLeft < OUT_OF_BOUNDARIES_CELLS_COUNT) {
      this.setState((prevState) => ({xCount: prevState.xCount + 5}));
    }
  }, 50);

  /**
   * Начало игры
   */
  startGame = () => {
    this.props.gameActions.makeMove({cell: [0, 0]});
    this.setState({
      isGameInProcess: true
    });
  };

  /**
   * Метод выполнения хода
   * @param {TCoordinates} coordinates Координаты клетки, в которую сделан ход.
   */
  makeMove = (coordinates: TCoordinates) => {
    const {hasWinner, gameActions} = this.props;
    if (hasWinner || !this.state.isGameInProcess) return;
    gameActions.makeMove({ cell: coordinates });
  };

  /**
   * Отрисовка клеток.
   */
  renderCells = () => {
    const cells: JSX.Element[] = [];

    for (let i = 0; i < this.state.yCount; i++) {
      const cellsRow: JSX.Element[] = [];
      for (let j = 0; j < this.state.xCount; j++) {
        cellsRow.push(
          <Cell
            value={this.props.board[[i, j]?.toString()]}
            key={"cell" + i + j}
            coordinates={[i, j]}
            onClick={this.makeMove}
          />
        );
      }
      cells.push(
        <div className="cells-row" key={"row" + i}>
          {cellsRow}
        </div>
      );
    }

    return cells;
  };

  render() {
    const { turn, hasWinner, dataTestId } = this.props;
    const valueClassName = turn === EValue.X ? "x-value" : "o-value";
    return (
      <div className="game" data-testid={dataTestId}>
        <header className="header">
          <span className="value">
            Ход: <span className={valueClassName}>{turn}</span>
          </span>
          <Button className="header-button" onClick={this.startGame}>Начать игру</Button>
          {hasWinner && <span className="has-winner">Игра окончена. Победил игрок: <span className={valueClassName}>{turn}</span> </span>}
        </header>
        <div className="board" ref={this.tableRef}>{this.renderCells()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGameState) => {
  const { board, turn, hasWinner } = state;
  return {
    board,
    turn,
    hasWinner
  };
};

const mapActionsToProps = (dispatch: Dispatch) => {
  return {
    gameActions: bindActionCreators<IGameActions, any>(new GameActions(), dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Board);

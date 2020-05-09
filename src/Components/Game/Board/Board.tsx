import { TBoardState } from "Reducers/Reducers";
import React, { RefObject } from "react";
import { CellHeight, CellWidth } from "Consts/ConfigConsts";
import { EValue } from "Consts/GameConsts";
import { TCoordinates } from "Consts/ActionTypes";
import { debounce } from "Utils/Utils";
import { CellsRow } from "Components/Game/CellsRow/CellsRow";
import "./Board.css";

/**
 * Константа для расчета дополнительно отрисовываемых клеток при скролле к границе поля.
 */
const OUT_OF_BOUNDARIES_CELLS_COUNT = 5;

/**
 * Интерфейс пропсов игрового поля.
 *
 * @prop {TBoardState} board Состояние игрового поля.
 * @prop {Function} onMakeMove Функция обработчик хода.
 * @prop {EValue} turn Текущий ход.
 */
interface IProps {
  board: TBoardState;
  onMakeMove: (coordinate: TCoordinates) => void;
  turn: EValue;
}

/**
 * Ссостояние стейта игрового поля.
 * @prop {number} xCount Количество клеток по координате Х.
 * @prop {number} yCount Количество клеток по координате Y.
 */
interface IState {
  xCount: number;
  yCount: number;
}

export class Board extends React.Component<IProps, IState> {
  state: IState = {
    xCount: Math.floor(
      window.innerWidth / CellWidth + OUT_OF_BOUNDARIES_CELLS_COUNT
    ),
    yCount: Math.floor(
      window.innerHeight / CellHeight + OUT_OF_BOUNDARIES_CELLS_COUNT
    ),
  };

  /**
   * Реф на игровое поле.
   */
  boardRef: RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    this.subscribeListeners();
  }

  componentWillUnmount() {
    this.unsubscribeListeners();
  }

  /**
   * Подписка на изменение размеров окна, подписка на скролл, для отрисовки дополнительных клеток.
   */
  subscribeListeners = () => {
    window.addEventListener("resize", this.updateBoardOnResize);
    this.boardRef.current!.addEventListener(
      "scroll",
      this.addExtraCellsOnScroll
    );
  };

  /**
   * Отписка подписчиков при анмаунте.
   */
  unsubscribeListeners = () => {
    window.removeEventListener("resize", this.updateBoardOnResize);
    this.boardRef.current!.removeEventListener(
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
    if (
      (e.target as Element).scrollHeight -
        (e.target as Element).clientHeight -
        (e.target as Element).scrollTop <
      OUT_OF_BOUNDARIES_CELLS_COUNT
    ) {
      this.setState((prevState) => ({ yCount: prevState.yCount + 5 }));
    }

    if (
      (e.target as Element).scrollWidth -
        (e.target as Element).clientWidth -
        (e.target as Element).scrollLeft <
      OUT_OF_BOUNDARIES_CELLS_COUNT
    ) {
      this.setState((prevState) => ({ xCount: prevState.xCount + 5 }));
    }
  }, 50);

  /**
   * Отрисовка строк игрового поля.
   */
  renderRows = () => {
    const { xCount, yCount } = this.state;
    const { board, onMakeMove } = this.props;

    const rows: JSX.Element[] = [];

    for (let i = 0; i < yCount; i++) {
      rows.push(
        <CellsRow
          rowIndex={i}
          cellsCount={xCount}
          board={board}
          onClick={onMakeMove}
          key={i}
        />
      );
    }

    return rows;
  };

  render() {
    return (
      <div className="board" ref={this.boardRef}>
        {this.renderRows()}
      </div>
    );
  }
}

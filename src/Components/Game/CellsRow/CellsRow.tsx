import React from "react";
import { Cell } from "Components/Game/Cell/Cell";
import { TCoordinates } from "Consts/ActionTypes";
import { TBoardState } from "Reducers/Reducers";
import "./CellsRow.css";

/**
 * @prop {number} rowIndex Индекс строки.
 * @prop {number} cellsCount Количество клеток в строке.
 * @prop {TBoardState} board Состояние доски.
 * @prop {Function} onClick Функция коллбек клика по клетке.
 */
interface IProps {
  rowIndex: number;
  cellsCount: number;
  board: TBoardState;
  onClick: (coordinate: TCoordinates) => void;
}

/**
 * Класс отрисовки строки клеток.
 */
export class CellsRow extends React.Component<IProps, {}> {
  /**
   * Обработчик нажатия на клетку.
   * @param {TCoordinates} coordinates Координаты клетки.
   */
  handleCellClick = (coordinates: TCoordinates) => {
    this.props.onClick(coordinates);
  };

  /**
   * Отрисовка клеток.
   */
  renderCells = () => {
    const { cellsCount, rowIndex } = this.props;

    const cells: JSX.Element[] = [];

    for (let i = 0; i < cellsCount; i++) {
      cells.push(
        <Cell
          value={this.props.board[[rowIndex, i].toString()]}
          key={"cell" + rowIndex + i}
          coordinates={[rowIndex, i]}
          onClick={this.handleCellClick}
        />
      );
    }

    return cells;
  };

  render() {
    return (
      <div className="cells-row" key={"row" + this.props.rowIndex}>
        {this.renderCells()}
      </div>
    );
  }
}

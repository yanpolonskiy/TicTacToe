import React from "react";
import { EValue } from "Consts/GameConsts";
import "./Cell.css";
import {TCoordinates} from 'Consts/ActionTypes';

/**
 * Интерфейс клетки игрового поля.
 * @prop {EValue} [value] Значение в клетке.
 * @prop {TCoordinates} coordinates Координаты клетки.
 * @prop {Function} onClick Функция коллбек клика по клетке.
 */
interface IProps {
  value?: EValue;
  coordinates: TCoordinates;
  onClick: (coordinate: TCoordinates) => void;
}

export class Cell extends React.Component<IProps> {
  /**
   * Обработчик клика по клетке.
   */
  handleClick = () => {
    this.props.onClick(this.props.coordinates);
  };

  render() {
    const { value } = this.props;
    const valueClassName = `value ${
      value ? (value === EValue.X ? "x-value" : "o-value") : ""
    }`;
    return (
      <div className="cell" onClick={this.handleClick}>
        <span className={valueClassName}>{value}</span>
      </div>
    );
  }
}

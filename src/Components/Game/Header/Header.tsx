import React from "react";
import { Button } from "Components/Common/Button/Button";
import { EValue } from "Consts/GameConsts";
import "./Header.css";

/**
 * @prop {EValue} turn Текущий ход.
 * @prop {boolean} hasWinner ПризнаК, что есть победитель игры.
 * @prop {Function} onStart Функция начала игры.
 */
interface IProps {
  turn: EValue;
  hasWinner: boolean;
  onStart: () => void;
}

/**
 * Хедер игрового поля.
 */
export const Header = (props: IProps) => {
  const { onStart, turn, hasWinner } = props;
  const valueClassName = turn === EValue.X ? "x-value" : "o-value";
  return (
    <header className="header">
      <span className="value">
        Ход: <span className={valueClassName}>{turn}</span>
      </span>
      <Button className="header-button" onClick={onStart}>
        Начать игру
      </Button>
      {hasWinner && (
        <span className="has-winner">
          Игра окончена. Победил игрок:{" "}
          <span className={valueClassName}>{turn}</span>{" "}
        </span>
      )}
    </header>
  );
};

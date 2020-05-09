import { TBoardState } from "Reducers/Reducers";
import { EValue } from "Consts/GameConsts";

/**
 * Возвращает функцию, которая, пока она продолжает вызываться,
 * не будет запускаться.
 * Она будет вызвана один раз через N миллисекунд после последнего вызова.
 * Если передано аргумент `immediate` (true), то она запустится сразу же при
 * первом запуске функции.
 * @param {Function} func Функция для вызова.
 * @param {number} wait Параметр задержки.
 * @param {boolean} immediate Признак запуска функции при первом вызове.
 */
function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout!);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

/**
 * Функция проверки наличия победителя на доске.
 * @param {TBoardState} board Состояние доски.
 * @param {number} x Координата х последнего хода.
 * @param {number} y Координата y последнего хода.
 */
function checkWin(board: TBoardState, x: number, y: number): boolean {
  let newFig = getFig(board, x, y);
  if (!newFig) return false;

  return (
    checkLine(board, newFig, x, y, 1, 0) || //горизонталь
    checkLine(board, newFig, x, y, 0, 1) || //вертикаль
    checkLine(board, newFig, x, y, 1, 1) || //диагональ 45
    checkLine(board, newFig, x, y, 1, -1)
  ); //диагональ 135
}

/**
 * Функция нахождения победителя по линии в заданном направлении.
 * @param {TBoardState} board Состояние доски.
 * @param {EValue} value Значение последнего хода.
 * @param {number} x Координата х клетки.
 * @param {number} y Координата y клетки.
 * @param {number} dx Изменение по координате х для задания направления.
 * @param {number} dy Изменение по координате y для задания направления.
 */
function checkLine(
  board: TBoardState,
  value: EValue,
  x: number,
  y: number,
  dx: number,
  dy: number
): boolean {
  let score = 0;
  while (getFig(board, x - dx, y - dy) === value) {
    x -= dx;
    y -= dy;
  }
  while (getFig(board, x, y) === value) {
    x += dx;
    y += dy;
    score++;
  }
  return score >= 5;
}

/**
 * Вспомогательная функция получения значения в клетке.
 * @param {TBoardState} board Состояние доски.
 * @param {number} x Координата х клетки.
 * @param {number} y Координата y клетки.
 */
function getFig(board: TBoardState, x: number, y: number): EValue {
  return board[[x, y].toString()];
}

export { debounce, checkWin };

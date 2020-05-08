import {GAME_ACTION, TGameActions} from 'Consts/ActionTypes';
import {EValue} from 'Consts/GameConsts';
import {checkWin} from 'Utils/Utils';

/**
 * Состояние игры.
 * @prop {TBoardState} board Состояние игровой доски.
 * @prop {EValue} turn Текущий ход.
 * @prop {boolean} hasWinner Есть ли победитель.
 */
export interface IGameState {
  board: TBoardState;
  turn: EValue,
  hasWinner: boolean
}

/**
 * Состояние доски. Хранится в виде обьекта с ключоми, образованными от приведения к строке массива вида [number,
 * number].
 * @prop {EValue} [prop: string] Значение в клетке.
 */
export type TBoardState = {
  [prop: string]: EValue;
};

/**
 * Исходное состояние игры
 */
const initialState: IGameState = {
  board: {},
  turn: EValue.X,
  hasWinner: false
};

/**
 * Редьюсер игры.
 * @param {IGameState} state Состояние игры.
 * @param {TGameActions} action Экшен.
 */
export const gameReducer = (
  state: IGameState = initialState,
  action: TGameActions
): IGameState => {
  const { type, payload } = action;
  // свич добавлен для возможного расширения.
  switch (type) {
    case GAME_ACTION.MAKE_MOVE:
      const { cell } = payload;

      // Проверка на первый ход игры.
      if (cell[0] === 0 && cell[1] === 0) {
        return {...initialState, board: {[cell.toString()]: EValue.X}, turn: EValue.O};
      }

      //проверка, что хода в эту клетку еще не было.
      if (state.board[cell.toString()]) {
        return state;
      }

      const board = { ...state.board, [cell.toString()]: state.turn };
      const hasWinner = checkWin(board, cell[0], cell[1]);
      const newTurn = hasWinner ? state.turn : state.turn === EValue.X ? EValue.O : EValue.X;
      return { ...state, board, turn: newTurn, hasWinner };
  }
  return initialState;
};
